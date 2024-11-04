from django.conf import settings

from django.utils.translation import get_language_from_request


class TranslatedSerializerMixin(object):

    """

    Mixin for selecting only requested translation with django-parler-rest

    """

    def to_representation(self, instance):

        inst_rep = super().to_representation(instance)

        request = self.context.get('request')

        lang_code = request.LANGUAGE_CODE

        result = {}

        for field_name, field in self.get_fields().items():

            # add normal field to resulting representation

            if field_name != 'translations':

                field_value = inst_rep.pop(field_name)

                result.update({field_name: field_value})

            if field_name == 'translations':

                translations = inst_rep.pop(field_name)

                if lang_code not in translations:

                    # use fallback setting in PARLER_LANGUAGES

                    parler_default_settings = settings.PARLER_LANGUAGES['default']

                    if 'fallback' in parler_default_settings:

                        lang_code = parler_default_settings.get('fallback')

                    if 'fallbacks' in parler_default_settings:

                        lang_code = parler_default_settings.get('fallbacks')[0]

                for lang, translation_fields in translations.items():

                    if lang == lang_code:

                        trans_rep = translation_fields.copy()  # make copy to use pop() from

                        for trans_field_name, trans_field in translation_fields.items():

                            field_value = trans_rep.pop(trans_field_name)

                            result.update({trans_field_name: field_value})

        return result

    def update(self, instance, validated_data):

        object = super().update(instance, validated_data)

        request = self.context.get('request')

        lang_code = request.LANGUAGE_CODE

        object.set_current_language(lang_code)

        sent_data = self._context.get('sent_data')

        for field in self.Meta.model._parler_meta.get_all_fields():

            value_to_save = sent_data.get(field) or None

            if value_to_save:

                setattr(object, field, value_to_save)

        object.save()

        return object

    def create(self, validated_data):

        object = super().create(validated_data)

        request = self.context.get('request')

        lang_code = request.LANGUAGE_CODE

        object.set_current_language(lang_code)

        sent_data = request.data

        for field in self.Meta.model._parler_meta.get_all_fields():

            value_to_save = sent_data.get(field) or None

            if value_to_save:

                setattr(object, field, value_to_save)

        object.save()

        return object

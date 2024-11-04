from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


User = settings.AUTH_USER_MODEL


class Profile(TranslatableModel):

    translations = TranslatedFields(
        first_name=models.CharField(
            max_length=settings.SHORT_TEXT_LENGTH, blank=True),
        last_name=models.CharField(
            max_length=settings.SHORT_TEXT_LENGTH, blank=True),
        home_page_title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            blank=True,
            verbose_name=_('Home page Title')),
        about_me_title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            blank=True,
            verbose_name=_('About me title')),
        summary=models.TextField(
            blank=True,
            verbose_name=_('Summary')),
        degree=models.CharField(
            max_length=settings.SHORT_TEXT_LENGTH,
            blank=True,
            verbose_name=_('Degree')),
        address=models.CharField(
            max_length=settings.MEDIUM_TEXT_LENGTH,
            blank=True,
            verbose_name=_('Address')),
        experience_period=models.CharField(
            max_length=settings.SHORT_TEXT_LENGTH,
            help_text='enter digit and years or month example: 10 Years and 3 months',
            blank=True,
            verbose_name=_('Experience Period')
        )
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name=_('User'))
    # home page fields
    home_image = models.ImageField(
        upload_to='profiles/images/home/',
        blank=True,
        verbose_name=_('Home image'))
    # first_name and last_name are in user model
    video = models.URLField(
        blank=True,
        verbose_name=_('Video'))
    # about me fields
    about_image = models.ImageField(
        upload_to='profiles/images/about/',
        blank=True,
        verbose_name=_('About image'))

    cv = models.FileField(
        upload_to='profiles/documents/cv/',
        null=True,
        blank=True,
        verbose_name=_('Cv'))
    # again first_name and last_name are in user model
    phone = models.CharField(
        max_length=settings.SHORT_TEXT_LENGTH,
        blank=True, verbose_name=_('Phone'))

    birth_day = models.DateField(
        null=True,
        blank=True,
        verbose_name=_('Birthday'))
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated by'))

    # email field from user model
    freelance = models.BooleanField(
        default=False,
        blank=True,
        verbose_name=_('Freelance'))

    # Footer socials
    tweeter = models.URLField(
        null=True,
        blank='True',
        verbose_name=_('Tweeter'))
    facebook = models.URLField(
        null=True,
        blank='True',
        verbose_name=_('Facebook'))
    linkedin = models.URLField(
        null=True,
        blank='True',
        verbose_name=_('Linked in'))
    instagram = models.URLField(
        null=True,
        blank='True',
        verbose_name=_('Instagram'))

    # Control sections
    quality_public = models.BooleanField(
        default=False,
        verbose_name=_('Quality'))
    skill_public = models.BooleanField(
        default=False,
        verbose_name=_('Skill'))
    service_public = models.BooleanField(
        default=False,
        verbose_name=_('Service'))
    portfolio_public = models.BooleanField(
        default=False,
        verbose_name=_('Portfolio'))
    review_public = models.BooleanField(
        default=False,
        verbose_name=_('Review'))
    blog_public = models.BooleanField(
        default=False,
        verbose_name=_('Blog'))
    contact_public = models.BooleanField(
        default=False,
        verbose_name=_('Contact'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.user.username}'

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _("Profiles")

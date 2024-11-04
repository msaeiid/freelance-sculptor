import { useEffect, useState } from "react";
import { SkillComponent, SkillInterface } from "./skill";
import { lookup } from "../lookup/components";
import { paths_dict } from "../lookup/url";
interface SkillListInterface {
  scrolledOn: boolean;
}

export function SkillListComponent(props: SkillListInterface) {
  const { scrolledOn } = props;

  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [skills, setSkills] = useState<SkillInterface[]>([]);

  const handleSkillLookup = (response: SkillInterface[], status: number) => {
    if (status === 200) {
      setSkills(response);
      setSkillsLoaded(true);
    }
  };

  useEffect(() => {
    if (!skillsLoaded) {
      lookup(
        "GET",
        paths_dict.skill,
        handleSkillLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [skillsLoaded]);

  return (
    <>
      {skills.map((skill: SkillInterface, index: number) => (
        <SkillComponent
          {...skill}
          key={`${index}-${skill.id}`}
          scrolledOn={scrolledOn}
        />
      ))}
    </>
  );
}

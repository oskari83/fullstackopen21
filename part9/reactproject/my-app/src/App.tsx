// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CourseBasePlusDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseBasePlusDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseBasePlusDescription extends CoursePartBase {
  description: string;
}

interface CourseSpecialPart extends CourseBasePlusDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({name}: {name: string}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({coursePart}: PartProps) => {
  let additionalContent;
  switch (coursePart.type){
    case "normal":
      additionalContent = (<p>{coursePart.description}</p>)
      break;
    case "groupProject":
      additionalContent = (<div>
        group project exercises {coursePart.groupProjectCount}
      </div>);
      break;
    case "submission":
      additionalContent = (<div>
        <p>{coursePart.description}</p>
        <p>submit to {coursePart.exerciseSubmissionLink}</p>
      </div>);
      break;
    case "special":
      additionalContent = (
        <div>
          <p>{coursePart.description}</p>
          <p>required skills: {coursePart.requirements.join(', ')}</p>
        </div>
      );
      break;
    default:
      assertNever(coursePart);
  }

  return (
    <div>
      <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
      {additionalContent}
      <br></br>
    </div>
  )
}

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
  return (
    <div>
      <Part coursePart={courseParts[0]} />
      <Part coursePart={courseParts[1]} />
      <Part coursePart={courseParts[2]} />
      <Part coursePart={courseParts[3]} />
      <Part coursePart={courseParts[4]} />
    </div>
  )
}

const Total = ({courseParts}: {courseParts: Array<{name: string, exerciseCount: number}>}) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
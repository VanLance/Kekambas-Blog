type InstructorsProps = {
    associate: string;
    senior: string;
};

export default function Instructors({ associate, senior }: InstructorsProps): JSX.Element {
    return (
        <>
            <h2>Instructors</h2>
            <p>Sr: {senior}</p>
            <p>Associate: {associate}</p>
        </>
    );
}

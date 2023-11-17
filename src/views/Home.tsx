import { useState } from "react";

import Instructors from "../components/Instructors";
import UserType from "../types/auth";

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}

export default function Home({ loggedInUser }: HomeProps) {
    const [studentForWB, setStudentForWb] = useState<string>("andrew");

    const kekambas = {
        instructors: {
            senior: "Brian",
            associate: "Sarah",
        },
        students: ["william", "sterling", "dylan", "zachary", "andrew"],
    };

    function getRandomStudent() {
        setStudentForWb(
            kekambas.students[
                Math.floor(Math.random() * kekambas.students.length)
            ]
        );
        console.log(studentForWB);
    }

    return (
        <>
            { loggedInUser && <h1>Hello {loggedInUser.username}</h1> }
            <Instructors
                associate={kekambas.instructors.associate}
                senior={kekambas.instructors.senior}
            />
            <h3>Students</h3>
            {kekambas.students.map((student, i) => (
                <p key={i}>{student}</p>
            ))}
            <p>Student performing today's whiteboard: {studentForWB}</p>
            <button onClick={getRandomStudent}>Get Student</button>
        </>
    );
}

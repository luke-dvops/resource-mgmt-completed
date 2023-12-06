function sumTwoNumbers(num1, num2) {
    return num1 + num2;
}

function computeGrade(marks) {
    if (marks >= 80) return "A";
    else if (marks >= 75) return "B+";
    else if (marks >= 70) return "B";
    else if (marks >= 65) return "C+";
    else if (marks >= 60) return "C";
    else if (marks >= 55) return "D+";
    else if (marks >= 50) return "D";
    else return "F";
}

module.exports = { sumTwoNumbers, computeGrade }
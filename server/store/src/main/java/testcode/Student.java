package testcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Student implements Comparable<Student> {
    int id;
    String name;

    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Comparable: Natural ordering by name
    @Override
    public int compareTo(Student o) {
        return this.name.compareTo(o.name);  // ✅ corrected
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    public static void main(String[] args) {
        List<Student> students = List.of(
                new Student(3, "Ana"),
                new Student(1, "Seema"),
                new Student(2, "Pratt")
        );

        List<Student> sortedStudents = new ArrayList<>(students);
        Collections.sort(sortedStudents);  // Uses compareTo() from Comparable
        sortedStudents.forEach(System.out::println);
        System.out.println("a"+"b");
        System.out.println('a'+"b");
    }
}

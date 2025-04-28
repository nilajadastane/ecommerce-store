package testcode;

import javax.swing.text.html.parser.Entity;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static java.util.TimeZone.getDefault;

public class User {
    public String name;
    boolean isSubscribed;
    int age;
    User(String name, boolean isSubscribed, int age) {
        this.name = name;
        this.isSubscribed = isSubscribed;
        this.age = age;
    }
    public static void main(String[] args) {
        /*Filter only subscribed users
        Convert them into email messages:
        "Hi [name], thanks for subscribing!"
        Send (print) the email*/
        List<User> users = List.of(
                new User("John", true,22),
                new User("Mary", false, 44),
                new User("Mike", true, 11),
                new User("Mike", true, 11)
        );
        List<String> names = List.of("John..", "Mary..", "Mike","Mary..","Smith");
        Map<String,Long> nameWithCount = names.stream()
                .collect(Collectors.groupingBy(name-> name,Collectors.counting()));
        //System.out.println(nameWithCount);
        for(Long value:nameWithCount.values()){
            System.out.println("value "+value);
        }
        for(String k: nameWithCount.keySet()){
            System.out.println("key "+k);
        }
        for(Map.Entry<String,Long> entry :nameWithCount.entrySet() ){
            System.out.println("key "+entry.getKey()+" value "+entry.getValue());
        }
        nameWithCount.forEach((k,v) -> {
            System.out.println("key -- "+k+" value "+v);
        });
        List<Integer> input = List.of(4, 5, 1, 2, 5, 4);
        Set<Integer> set = new HashSet<>();
        int n2 = input.stream()
                .filter(num -> !set.add(num))
                .findFirst()
                .orElse(null);
        System.out.println(n2);
        Optional<String> opt = Optional.of("hello");
        String val1 = opt.orElse(String.valueOf(getDefault()));
        String val2 = opt.orElseGet(() -> String.valueOf(getDefault()));


//        Predicate<User> isSubscribed = user -> user.isSubscribed;
//        Function<User,String> emailMessage =  user -> "Hi " + user.name + ", thanks for subscribing!";
//        Consumer<String> sendEmail = System.out::println;
//        users.stream()
//                .filter(user -> user.isSubscribed)
//                .map(user -> "Hi "+user.name+", thanks for subscribing----!")
//                .forEach(user -> System.out.println(user));
//        users.stream()
//                .collect(Collectors.toSet())
//                .forEach(u -> System.out.println(u.name));
//        List<List<String>> nested = List.of(
//                List.of("Java", "Python"),
//                List.of("C++", "Go"),
//                List.of("Rust","Go")
//        );
//
//        Set<String> flatList = nested.stream()         // Stream<List<String>>
//                .flatMap(List::stream)                      // Stream<String>
//                .collect(Collectors.toSet());              // Flattened list
//
//        System.out.println(flatList);

    }
}

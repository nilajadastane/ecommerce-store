package testcode;

public interface InterfaceB {
    default void printValue() {
        System.out.println("Value from InterfaceB");
    }
    static void greet() {
        System.out.println("Hello from interface static method");
    }
}

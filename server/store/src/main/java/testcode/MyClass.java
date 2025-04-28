package testcode;

public class MyClass extends Thread  implements InterfaceA, InterfaceB, Runnable  {
    @Override
    public void printValue() {
        InterfaceB.super.printValue();
    }
    private String threadName;
    private int count;
    public MyClass(String name, int startCount) {
        threadName = name;
        count = startCount;
        System.out.println("Creating " + threadName);
    }

    public void run() {
        System.out.println("Running " + threadName);
        try {
            while (count < 5) {
                System.out.println(threadName + ": Count is " + count);
                count++;
                Thread.sleep(500); // Pause for 500 milliseconds
            }
        } catch (InterruptedException e) {
            System.out.println( " interrupted.");
        }
    }


    @Override
    public void printTest() {
        System.out.println("testing printtest");
    }
    public static void greet() {
        System.out.println("Hello from class");
    }

    public static void main(String[] args) {
//        MyClass myClass = new MyClass();
//        myClass.processCreditCard();
//        myClass.printValue();
//        myClass.printTest();
//        InterfaceB.greet();
        MyClass thread1 = new MyClass("Thread-1", 0);
        MyClass thread2 = new MyClass("Thread-2", 1);
        thread1.start();
        thread2.start();
        new Thread(() -> System.out.println("Running.---------------..")).start();
    }


}

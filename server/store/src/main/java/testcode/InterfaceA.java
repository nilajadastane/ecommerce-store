package testcode;

public interface InterfaceA {
    default void printValue() {
        System.out.println("Value from InterfaceA");
    }
    default void processCreditCard() {
        logTransaction("credit");
    }

    default void processDebitCard() {
        logTransaction("debit");
    }

    private void logTransaction(String type) {
        System.out.println("Logging " + type + " transaction...");
    }
    void printTest();
}

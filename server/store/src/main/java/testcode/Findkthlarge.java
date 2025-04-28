package testcode;

import java.util.PriorityQueue;

public class Findkthlarge {
    public static int findKthLargest(int[] nums, int k) {
        // Create a min heap (PriorityQueue)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);

            // Keep heap size at most k
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove the smallest
            }
        }
        // The root of the heap is the kth largest element
        return minHeap.peek();
    }
    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 9, 6, 4};
        int k = 2;
        System.out.println("Kth largest element is: " + findKthLargest(nums, k)); // Output: 5
    }
}

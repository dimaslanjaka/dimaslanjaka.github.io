package com.dimaslanjaka.stackqueue;

class Queue {
    private static int front, rear, capacity, count_queue;
    private static int[] queue;

    Queue(int c) {
        front = rear = 0;
        capacity = c;
        queue = new int[capacity];
    }

    // function to insert an element
    // at the rear of the queue
    static void Enqueue(int data) {
        // check queue is full or not
        if (capacity == rear) {
            System.out.print("\nQueue is full\n");
        }

        // insert element at the rear
        else {
            queue[rear] = data;
            rear++;
        }
    }

    // function to delete an element
    // from the front of the queue
    static void Dequeue() {
        // if queue is empty
        if (front == rear) {
            System.out.print("\nQueue is empty\n");
        }

        // shift all the elements from index 2 till rear
        // to the right by one
        else {
            if (rear - 1 >= 0) {
                System.arraycopy(queue, 1, queue, 0, rear - 1);
            }
          /*
          for (int i = 0; i < rear - 1; i++) {
              queue[i] = queue[i + 1];
          }
           */

            // store 0 at rear indicating there's no element
            if (rear < capacity)
                queue[rear] = 0;

            // decrement rear
            rear--;
        }
    }

    // print queue elements
    static void Display(){
        Display(false);
    }

    static void Display(boolean printLast) {
        int i;
        if (front == rear || rear == 0) {
            System.out.print("\nQueue is Empty\n");
            return;
        }

        // traverse front to rear and print elements

        for (i = front; i < rear; i++) {
            System.out.printf(" %d <-- ", queue[i]);
            /*
            Jika iteration terakhir sama dengan total loop dikurang 1
            - rear = total loop
            - rumus loop last iteration => total loop - 1
             */
            if (i == rear - 1) {
                System.out.printf("Total %d", rear);
                if (printLast){
                    System.out.printf("\nThe Size Of Queue After Enqueue And Dequeue is %d", rear);
                }
            }
        }
    }

    // print front of queue
    static void queueFront() {
        if (front == rear) {
            System.out.print("\nQueue is Empty\n");
            return;
        }
        System.out.printf("\nFront Element is: %d", queue[front]);
    }
}
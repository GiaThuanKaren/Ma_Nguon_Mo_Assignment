
import tkinter as tk

# Function to calculate the Fibonacci sequence
def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Function to handle button click event
def calculate_fibonacci():
    # Get the value of the input field
    n = int(input_field.get())

    # Calculate the Fibonacci sequence from 0 to n
    result = [str(fibonacci(i)) for i in range(n)]

    # Display the result in the output field
    output_field.delete(0, tk.END)
    output_field.insert(0, ', '.join(result))

# Create the main window
root = tk.Tk()
root.title('Fibonacci Sequence')

# Create the input field and label
input_label = tk.Label(root, text='Enter a number N:')
input_label.pack()
input_field = tk.Entry(root)
input_field.pack()

# Create the button
calculate_button = tk.Button(root, text='Calculate', command=calculate_fibonacci)
calculate_button.pack()

# Create the output field and label
output_label = tk.Label(root, text='Fibonacci sequence:')
output_label.pack()
output_field = tk.Entry(root)
output_field.pack()

# Start the main event loop
root.mainloop()

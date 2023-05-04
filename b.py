import tkinter as tk
from math import pi

# Function to calculate the area and perimeter of a circle
def calculate_circle():
    radius = float(radius_field.get())
    area = pi * radius ** 2
    perimeter = 2 * pi * radius
    circle_area_field.delete(0, tk.END)
    circle_perimeter_field.delete(0, tk.END)
    circle_area_field.insert(0, str(round(area, 2)))
    circle_perimeter_field.insert(0, str(round(perimeter, 2)))

# Function to calculate the area and perimeter of a rectangle
def calculate_rectangle():
    width = float(rectangle_width_field.get())
    height = float(rectangle_height_field.get())
    area = width * height
    perimeter = 2 * (width + height)
    rectangle_area_field.delete(0, tk.END)
    rectangle_perimeter_field.delete(0, tk.END)
    rectangle_area_field.insert(0, str(round(area, 2)))
    rectangle_perimeter_field.insert(0, str(round(perimeter, 2)))

# Function to calculate the area and perimeter of a triangle
def calculate_triangle():
    base = float(triangle_base_field.get())
    height = float(triangle_height_field.get())
    side1 = float(triangle_side1_field.get())
    side2 = float(triangle_side2_field.get())
    area = 0.5 * base * height
    perimeter = base + side1 + side2
    triangle_area_field.delete(0, tk.END)
    triangle_perimeter_field.delete(0, tk.END)
    triangle_area_field.insert(0, str(round(area, 2)))
    triangle_perimeter_field.insert(0, str(round(perimeter, 2)))

# Create the main window
root = tk.Tk()
root.title('Geometry Calculator')

# Create the circle calculator
circle_frame = tk.Frame(root)
circle_frame.pack(padx=10, pady=10)
circle_label = tk.Label(circle_frame, text='Circle')
circle_label.grid(row=0, column=0, columnspan=2, pady=5)
radius_label = tk.Label(circle_frame, text='Radius:')
radius_label.grid(row=1, column=0)
radius_field = tk.Entry(circle_frame)
radius_field.grid(row=1, column=1)
circle_area_label = tk.Label(circle_frame, text='Area:')
circle_area_label.grid(row=2, column=0)
circle_area_field = tk.Entry(circle_frame)
circle_area_field.grid(row=2, column=1)
circle_perimeter_label = tk.Label(circle_frame, text='Perimeter:')
circle_perimeter_label.grid(row=3, column=0)
circle_perimeter_field = tk.Entry(circle_frame)
circle_perimeter_field.grid(row=3, column=1)
circle_button = tk.Button(circle_frame, text='Calculate', command=calculate_circle)
circle_button.grid(row=4, column=0, columnspan=2, pady=5)

# Create the rectangle calculator
rectangle_frame = tk.Frame(root)
rectangle_frame.pack(padx=10, pady=10)
rectangle_label = tk.Label(rectangle_frame, text='Rectangle')
rectangle_label.grid(row=0, column=0, columnspan=2, pady=5)
rectangle_width_label = tk.Label(rectangle_frame, text='Width:')
rectangle_width_label.grid(row=1, column=0)
rectangle_width_field = tk.Entry(rectangle_frame)
rectangle_width_field

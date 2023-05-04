import random
import math
def initList():
    print("Nhap So luong Phan Tu")
    n = int(input())
    list=[]
    for i in range(0,n):
        list.append(int(random.random()*100))
    return list

def CheckFrequencyByGiveValue(list,value):
    count=0
    for i in range(0,len(list)):
        if list[i] == value:
            count = count +1
    return count

def isPrime(n):
    if n < 2 :
        return False
    for i in range(2,n+1):
        if n / i ==0:
            return False
    return True 

def bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr


def GetSumAllPrime(list):
    sum =0
    for i in range( 0, len(list)):
        if isPrime(list[i]) == True:
            sum = sum + list[i]
    return sum

def FindNumber(list,value):
    for i in range(0, len(list)):
        if(list[i] == value):
            return True
    return False

def CheckSoDoiXung(list):
    
    for i in range(0,int(len(list)/2)):
        if list[i] != list[ int(len(list)-i)]:
            return False
    return True




print("Khoi tao list")
mylist =initList()
for i in range(0,len(mylist)):
    print(mylist[i])
print("Nhap gia tri can xoa")
value = int(input())
while(FindNumber(mylist,value)):
    mylist.remove(value)
print("Sau khi xoa")
for i in range(0,len(mylist)):
    print(mylist[i])






# print("Khoi tao list")
# mylist =initList()

# print("Nhap gia tri can them vao")
# value = int(input())
# mylist.append(value)
# print("List sau khi duoc them gia tri")
# for i in range(0,len(mylist)):
#     print(mylist[i])
# print("Nhap gia tri can kiem tra ")
# value = int(input())
# result = CheckFrequencyByGiveValue(mylist,value)
# print("So Lan xuat hien cua phan tu " + str(value)+":  "+str(result))
# print("List sau khi da duoc sap xep")
# mylist = bubble_sort(mylist)

# for i in range(0,len(mylist)):
#     print(mylist[i])







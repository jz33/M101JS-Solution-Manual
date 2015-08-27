import sys

if len(sys.argv) != 3:
    print "usage!"
else:
    hw3 = open(sys.argv[1])
    hw4 = open(sys.argv[2])
    
    x = hw3.readlines()
    y = hw4.readlines()
    
    if len(x) != len(y):
        print "unequal lines!"
    
    length = min(len(x),len(y))
    isEqual = True
    for i in xrange(0,length):
        a = x[i].strip()
        b = y[i].strip()
        if a != b:
            isEqual = False
            
            print i+1,":"
            print a
            print b
            
            break
            
    if isEqual: print "isEqual"
            
    hw3.close()
    hw4.close()

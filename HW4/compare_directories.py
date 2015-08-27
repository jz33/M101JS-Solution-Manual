import sys,os

if len(sys.argv) != 3:
    print "usage!"
else:
    hw3 = []
    for root, dirs, files in os.walk(sys.argv[1]):
        for name in files:
            hw3.append(os.path.join(root, name))
    
    hw4 = []
    for root, dirs, files in os.walk(sys.argv[2]):
        for name in files:
            hw4.append(os.path.join(root, name))
            
    if len(hw3) != len(hw4):
        print "Different number of files"
    else:
        for i in xrange(0,len(hw3)):
            fx = open(hw3[i])
            fy = open(hw4[i])
            x = fx.readlines()
            y = fy.readlines()
            
            if len(x) != len(y):
                print hw3[i],"unequal lines!"
                
            length = min(len(x),len(y))
            isEqual = True
            for j in xrange(0,length):
                a = x[i].strip()
                b = y[i].strip()
        
                if a != b:
                    isEqual = False
                    
                    print j+1,":"
                    print a
                    print b
                    
                    break
                    
            if isEqual: 
                print hw3[i], "is equal"

            fx.close()
            fy.close()

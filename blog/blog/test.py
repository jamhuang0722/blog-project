import bcrypt

password = b'123456'

x = bcrypt.hashpw(password, bcrypt.gensalt())
print('==x==', x)
y = bcrypt.hashpw(password, bcrypt.gensalt())
print('==y==', y)

print(bcrypt.checkpw(password, x))
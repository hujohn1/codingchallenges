import socket
import threading
import selectors
from types import SimpleNamespace 

#create a TCP/IP socket
HOST = '127.0.0.1'
PORT = 7007 #non privileged > 1024

select = selectors.DefaultSelector

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
    server.bind((HOST, PORT))
    server.listen(5)

    server.setblocking = False
    select.register(server, selectors.EVENT_READ)
    
    lsock, client_addr = server.accept()
    lsock.setblocking(False)
    select.register(lsock, selectors.EVENT_READ, )
    with lsock:
        while True:
            data= lsock.recv(1024)
            if not data:
                break
            lsock.sendall(data)
    
    server.close()

#s.bind: binds the socke to specified port address 
#listen: listens for ongoing communication
#recv(): receives data
#accept, creates another connection to send
#thread wait and thread lock
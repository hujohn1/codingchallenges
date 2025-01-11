import pygame, sys
from pygame.locals import *

pygame.init()
size = (500, 500)
width, height = size
screen = pygame.display.set_mode(size)
YELLOW = (255, 255, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

background = YELLOW

obj = pygame.image.load('sudoku/DVD_video_logo.png')
obj = pygame.transform.scale(obj, (100, 50))
rect = obj.get_rect()
velocity = [2, 2]

running = True
i = 0
while running:
    rect = rect.move(velocity)
    if rect.left < 0 or rect.right > width:
        velocity[0] = -velocity[0]
    if rect.top < 0 or rect.bottom > height:
        velocity[1] = -velocity[1]

    screen.fill(background)
    caption = 'Sudoku Puzzle Solver'
    pygame.draw.rect(screen, RED, rect, 1)
    screen.blit(obj, rect)
    pygame.display.set_caption(caption)
    i+=10

    if(i%10000==0):
        background = RED
    elif(i%10000==3330):
        background = GREEN
    elif(i%10000==6670):
        background = BLUE

    for event in pygame.event.get():
        if event.type == KEYDOWN:
            if event.key == K_r:
                background = RED
            elif event.key == K_g:
                background = GREEN
            elif event.key == K_b:
                background = BLUE
        #print(event)
        if event.type == QUIT:
            running = False
            pygame.quit()
            sys.exit()
    pygame.display.update()
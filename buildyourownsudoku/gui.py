import pygame, sys, os
from pygame.locals import *
from typing import *

# colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)

#square dim
DIM  = 50

class Tile:
    def __init__(self, value: int, isFinal: bool, x: int, y: int, color):
        self.value = value
        self.state = isFinal
        self.x = x # left edge x 
        self.y = y # top edge y
        self.dim = 50
        self.color = color
        self.rect = pygame.Rect(self.x, self.y, self.dim, self.dim)
    def draw(self, screen, font):
        pygame.draw.rect(screen, self.color, self.rect, 1)
        text = font.render(str(self.value), True, BLUE)
        text_rect = text.get_rect(center=(self.x + self.dim // 2, self.y + self.dim // 2))
        screen.blit(text, text_rect)

    def collide_point(self, pos):
        return self.rect.collidepoint(pos)


def generate_grid()->List[Tile]:
    tiles = []
    #LOGIC FOR CORRECT SPACINGS

    for r in range(9):
        for c in range(9):
            t = Tile(1, False, 50+c*DIM, 50+r*DIM, BLACK)
            tiles.append(t)

    return tiles


def main():
    pygame.init()
    pygame.font.init()

    #define dimensions
    WIDTH, HEIGHT = 800, 600
    SIZE = (WIDTH, HEIGHT)
    screen = pygame.display.set_mode(SIZE)

    #define text fonts
    font1 = pygame.font.SysFont('cmuserifbolditalic.ttf', 30)
    font2 = pygame.font.SysFont('cmuserifbolditalic.ttf', 20)
    img1 = font1.render('Reset', True, RED)

    #create background
    screen.fill(WHITE)

    running = True
    ts = generate_grid()
    while running:
        screen.fill(WHITE)
        caption = 'Sudoku Puzzle Solver'
        pygame.display.set_caption(caption)

        # tile value update scheme
        keymap = {K_0: 0, K_1: 1, K_2: 2, K_3: 3, K_4: 4, K_5: 5, K_6: 6, K_7: 7, K_8: 8, K_9: 9}
        
        for t in ts:
            t.draw(screen, font2)

        screen.blit(img1, (650, 200))
        pygame.display.flip()

        for event in pygame.event.get():
            if(event.type == KEYDOWN):
                mouse_pos = pygame.mouse.get_pos()
                for t in ts:
                    if t.collide_point(mouse_pos) and t.state == False:
                        if event.key in keymap:
                            t.value = keymap[event.key]
                            t.draw(screen, font2)
            if(event.type == QUIT):
                running = False
                sys.exit()
                pygame.quit()
        
if __name__=="__main__":
    main()

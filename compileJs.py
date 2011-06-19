#!/usr/bin/python
# -*- coding: utf-8 -*-
# compilor for evaluator.js
# @author: Labi Kyo <labikyo@gmail.com>

import re

def main():
    try:
        fin = open('./evaluator.js', 'r')
        fout = open('./script.js', 'w')
        fout.write('java\nscript:')
        remove_comment = re.compile(r'(.+)//.+')
        for line in fin:
            result = remove_comment.match(line)
            if result:
                line = result.group(1) # match comment, remove it
            line = re.sub('^\s+', '', line) # remove start spaces
            line = re.sub('\s+$', '', line) # remove end spaces
            fout.write(line.translate(None, '\n').translate(None, '\r'))
            # remove end of line
        fin.close()
        fout.close()
    except IOError:
        pass

if __name__ == '__main__':
    main()

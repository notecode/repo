
# 用于重新生成ctags，供vim "jump to definition"。二哥私用

# del the old one
# del ~/.vimtags

# generate new one
ctags -f ~/.vimtags -R -L src.txt



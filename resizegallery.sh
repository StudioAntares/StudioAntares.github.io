#!/bin/bash

# Check if a directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 /path/to/folder"
    exit 1
fi

# Assign the first argument as the directory path
directory=$1

# Loop through numerically named .jpg files and thumb.jpg in the specified directory
for img in "$directory"/[0-9]*.jpg "$directory/thumb.jpg"; do
    # Check if the file exists
    if [ -f "$img" ]; then
        # Rename the original file to add a .bak suffix
        mv "$img" "${img}.bak"

        # Resize the image and save it with the original filename
        ffmpeg -i "${img}.bak" -vf "scale='if(gt(iw,ih),2000,-1)':'if(gt(ih,iw),2000,-1)'" "$img"
        echo "Resized and saved: $img"
    fi
done

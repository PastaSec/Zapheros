#!/bin/bash

# Define the license and Solidity version
LICENSE="SPDX-License-Identifier: MIT"
SOLIDITY_PRAGMA="pragma solidity ^0.8.24;"

# Find all .sol files in the current directory and subdirectories
for file in $(find . -name "*.sol"); do
    # Check if the SPDX license is already present
    if ! grep -q "SPDX-License-Identifier" "$file"; then
        echo "Adding license to $file"
        # Prepend the SPDX license and pragma statement
        sed -i "1s|^|// $LICENSE\n$SOLIDITY_PRAGMA\n\n|" "$file"
    else
        echo "License already exists in $file, skipping."
    fi
done

echo "License addition complete!"


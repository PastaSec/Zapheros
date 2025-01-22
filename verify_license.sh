#!/bin/bash

EXPECTED_LICENSE="// SPDX-License-Identifier: MIT"
EXPECTED_PRAGMA="pragma solidity ^0.8.24;"

# Check all .sol files, excluding node_modules
for file in $(find ./contracts -name "*.sol"); do
    if grep -q "$EXPECTED_LICENSE" "$file" && grep -q "$EXPECTED_PRAGMA" "$file"; then
        echo "✅ $file: License and pragma are correct."
    else
        echo "❌ $file: Missing or incorrect license/pragma."
    fi
done


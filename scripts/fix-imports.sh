#!/usr/bin/env bash
set -e

echo "Replacing package@version in import specifiers..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -print0 | xargs -0 perl -0777 -pi -e 's/("|\')(\@?[A-Za-z0-9_\/\.\-]+)@[0-9]+(?:\.[0-9]+)*(?:-[A-Za-z0-9\.\-]+)?("|\')/$1$2$3/g'

echo "Done." 

exit 0

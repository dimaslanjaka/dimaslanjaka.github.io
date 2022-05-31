#!/usr/bin/env bash

actual_dir=packages/static-blog-generator
staged_dir=packages/static-blog-generator-staged
backup_dir=packages/static-blog-generator-backup

if [ ! -d "$staged_dir" ];
then
	#mv $actual_dir $staged_dir
fi

if [ -d "$backup_dir" ];
then
	#mv $backup_dir $actual_dir
fi

#echo -e "update submodules"
#git submodule foreach git pull

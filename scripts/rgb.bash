#!/usr/bin/env bash

hexToRgb () {
	local hex="$1"
	local mode="$2"

	local r=$((16#${hex:0:2}))
	local g=$((16#${hex:2:2}))
	local b=$((16#${hex:4:2}))

	if [[ $mode -eq "fg" ]]; then
		echo
		echo "\x1b[38;2;$r;$g;${b}m"
	else
		echo
		echo "\x1b[48;2;$r;$g;${b}m"
	fi
}


hexToRgb $*

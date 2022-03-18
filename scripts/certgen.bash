#!/usr/bin/env bash
HOSTNAME=uxc.dev
openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=$HOSTNAME" -addext "subjectAltName=DNS:$HOSTNAME" -newkey rsa:2048 -keyout ./packages/server/certs/localhost.key -out ./packages/server/certs/localhost.crt;

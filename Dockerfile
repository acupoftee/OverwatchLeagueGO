FROM alpine:3.6
RUN apk --no-cache add nodejs-current nodejs-npm
RUN npm set progress=false && npm install -g owl-go
CMD ["owl-go", "schedule"]
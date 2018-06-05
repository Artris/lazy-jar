FROM mongo
RUN apt-get update && \
	apt-get upgrade -y 

RUN apt-get install -y \
	gcc \
	libffi-dev \
	python-pip \
	python2.7 \
	lsb-release \
	python2.7-dev \
	curl \
	unzip \
	python-setuptools \
	&& apt-get autoremove \
	&& apt-get clean

# Install gcloud-cli
ENV CLOUD_SDK_REPO "cloud-sdk-jessie" 
RUN echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN apt-get update && \
	apt-get install -y \
	google-cloud-sdk \
	&& apt-get autoremove \
	&& apt-get clean

# Make folder path for dump
RUN mkdir -p /home/keys

# Copy files to image
COPY service.key.json /home/keys/
COPY seed-database.bash /opt/seed-database.bash
RUN chmod +x /opt/seed-database.bash

# Download a database dump
# Make sure you recursively zip the database dump.
RUN gcloud auth activate-service-account --key-file /home/keys/service.key.json
RUN gsutil cp gs://lazyjar-backup/lazyJar.zip /home/


# Unzip and populate the database
RUN unzip /home/lazyJar.zip -d /home/
ENTRYPOINT ["./opt/seed-database.bash"]
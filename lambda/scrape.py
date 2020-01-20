
from instagram_scraper import InstagramScraper
import requests
import json
import boto3

BASE_URL = 'https://www.instagram.com/'
PROFILE_INFO_URL = BASE_URL + '{0}/?__a=1'
QUERY_MEDIA = BASE_URL + 'graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={0}'
QUERY_MEDIA_VARS = '{{"id":"{0}","first":50,"after":""}}'
BUCKET_NAME = 'instagram.ppvm.io'

S3_CLIENT = boto3.resource('s3')



def scrape_handler(event, context): 
    username = event['username']
    ig_images = {'username': username, 'images': ig_get_images_for_username(username)}
    s3_append_ig_images(ig_images)

def ig_get_images_for_username(username):
    url = PROFILE_INFO_URL.format(username)
    response = requests.get(url)
    json_data = json.loads(response.text)
    user_id = json_data['graphql']['user']['id']
    params = QUERY_MEDIA_VARS.format(user_id)
    url = QUERY_MEDIA.format(params)
    response = requests.get(url)
    json_data = json.loads(response.text)
    edges = json_data['data']['user']['edge_owner_to_timeline_media']['edges']
    return [ e['node']['thumbnail_src'] for e in edges ]

def s3_append_ig_images(ig_images):
    content_object = S3_CLIENT.Object(BUCKET_NAME, 'data/images.json')
    file_content = content_object.get()['Body'].read().decode('utf-8')
    s3_images = json.loads(file_content)
    s3_images.append(ig_images)
    print("Uploading to S3")
    content_object.put(Body=json.dumps(s3_images, ensure_ascii=False))
    S3_CLIENT.ObjectAcl(BUCKET_NAME, 'data/images.json').put(ACL='public-read')
    return
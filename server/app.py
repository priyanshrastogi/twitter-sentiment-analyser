from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import tweepy
from textblob import TextBlob

# Twitter OAuth Tokens and Keys
consumer_key = 'sjUItYap4WnMEICAHjyEKSNHC'
consumer_secret = 'ZTkpRKQA2M735ma3rE4XDNZh4bPEhNYvwpSOwxvdK4A4XNLR3k'
access_token = '598847234-NSpUdR67EKtfNb9oB0pcoJjjEnf4x8bvVBzUjIj7'
access_token_secret = 'DhkDStGFXizz5ZzYB2ray0EUIehJUcTQ0jIfR0nN2Qv9h'

# Setting OAuth 
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Create Tweepy API
api = tweepy.API(auth)

# Create Flask App
app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return 'Twitter Sentiment Analyser REST API.'

@app.route('/analyse', methods=['GET'])
def analyse():
    if request.args.get('hashtag') == 'true':
        tweets = api.search('#{}'.format(request.args.get('search')), lang='en', count=100)
    else:
        tweets = api.search(q=request.args.get('search'), lang='en', count=100)
    res = []
    for tweet in tweets:
        sentiment = TextBlob(tweet.text).sentiment
        res.append({'text': tweet.text, 'subjectivity': sentiment.subjectivity, 'polarity': sentiment.polarity, 'author': tweet.user.screen_name})
    return jsonify(res)

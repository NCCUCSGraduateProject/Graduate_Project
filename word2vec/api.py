from flask import Flask, request
from flask_cors import CORS
from gevent import pywsgi
import jieba
import spacy

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

with open('./stops.txt', 'r', encoding='utf8') as f:
    global stopwords
    stopwords = f.read().split('\n')
  
stopwords.append('\n')
stopwords.append('\n\n')
stopwords.append('\n\n\n')
stopwords.append('⋯')
stopwords.append('😆')

print('create stop words\n\n')
nlp.Defaults.stop_words |= set(stopwords)

print('stop words created\n')

# filt stopwords和 不相關的詞
def filtStopWords(documents):
    words = set()
    i = 0
    #print('hi')
   
    doc = jieba.cut(documents.replace(' ', ''))
    for token in doc:  
        if str(token) not in nlp.Defaults.stop_words:
            words.add(str(token))
       
    return words

print('filter test:\n\n')

# 做embedding並產生vectors
def word2vec(words):
    return [nlp(word).vector.tolist() for word in words]



app = Flask(__name__)
CORS(app)
@app.route('/test', methods=['get'])
def index():
    
    return {'name': 'test'}

@app.route('/word2Vec', methods=['get'])
def index_1():
    inputText = request.args.get('inputText', default = '', type = str)
    print('parameters:',inputText)
    words = filtStopWords(inputText)
    print('words:',words)
    vectors = word2vec(words)
    return {'vectors': vectors}

# run server
print('server started')
server = pywsgi.WSGIServer(('127.0.0.1', 5000), app)
server.serve_forever()
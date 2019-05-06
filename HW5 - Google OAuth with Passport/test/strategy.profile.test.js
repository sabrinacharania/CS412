/* global describe, it, before, expect */
/* jshint expr: true */

var GoogleStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('fetched from Google+ API', function() {
    var strategy = new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX',
        userProfileURL: 'https://www.googleapis.com/plus/v1/people/me'
      }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://www.googleapis.com/plus/v1/people/me') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }
    
      var body = '{ \
 "kind": "plus#person",\
 "occupation": "Software Engineer",\
 "gender": "female",\
 "emails": [\
  {\
    "value": "sabrinac@bu.edu",\
    "type": "account"\
  }\
 ],\
 "urls": [\
  {\
   "value": "http://www.sabrinacharania.com/",\
   "type": "otherProfile",\
   "label": "Sabrina Charania"\
  }\
 ],\
 "objectType": "person",\
 "id": "111111111111111111111",\
 "displayName": "sabrina charania",\
 "name": {\
  "familyName": "charania",\
  "givenName": "sabrina"\
 },\
 "url": "https://plus.google.com/+sabrinacharania",\
 "image": {\
  "url": "https://lh5.googleusercontent.com/-AAAAA-AAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg?sz=50",\
  "isDefault": false\
 },\
 "organizations": [\
  {\
   "name": "Boston University",\
   "type": "school",\
   "primary": false\
  }\
 ],\
 "placesLived": [\
  {\
   "value": "Boston, MA",\
   "primary": true\
  }\
 ],\
 "isPlusUser": true,\
 "language": "en",\
 "circledByCount": 77,\
 "verified": false\
}';
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('google');
      
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('sabrina charania');
      expect(profile.name.familyName).to.equal('charania');
      expect(profile.name.givenName).to.equal('sabrina');
      expect(profile.emails[0].value).to.equal('sabrinac@bu.edu');
      expect(profile.emails[0].type).to.equal('account');
      expect(profile.photos[0].value).to.equal('https://lh5.googleusercontent.com/-AAAAA-AAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg?sz=50');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  });
  
  describe('fetched from OpenID Connect user info endpoint', function() {
    var strategy = new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX'
      }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://www.googleapis.com/oauth2/v3/userinfo') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }
    
      var body = '{\n "sub": "111111111111111111111",\n "name": "sabrina charania",\n "given_name": "sabrina",\n "family_name": "charania",\n "picture": "https://lh3.googleusercontent.com/-AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg",\n "email": "sabrinac@bu.edu",\n "email_verified": true,\n "locale": "en"\n}\n';
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('google');
      
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('sabrina charania');
      expect(profile.name.familyName).to.equal('charania');
      expect(profile.name.givenName).to.equal('sabrina');
      expect(profile.emails[0].value).to.equal('sabrinac@bu.edu');
      expect(profile.emails[0].verified).to.equal(true);
      expect(profile.photos[0].value).to.equal('https://lh3.googleusercontent.com/-AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  });
  
  describe('error caused by invalid token when using Google+ API', function() {
    var strategy = new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX',
        userProfileURL: 'https://www.googleapis.com/plus/v1/people/me'
      }, function() {});
    
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://www.googleapis.com/plus/v1/people/me') { return callback(new Error('incorrect url argument')); }
      
      var body = '{\n "error": {\n  "errors": [\n   {\n    "domain": "global",\n    "reason": "authError",\n    "message": "Invalid Credentials",\n    "locationType": "header",\n    "location": "Authorization"\n   }\n  ],\n  "code": 401,\n  "message": "Invalid Credentials"\n }\n}\n';
      callback({ statusCode: 401, data: body });
    };
      
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('invalid-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('GooglePlusAPIError');
      expect(err.message).to.equal("Invalid Credentials");
      expect(err.code).to.equal(401);
    });
  }); // error caused by invalid token when using Google+ API
  
  describe('error caused by invalid token when using user info endpoint', function() {
    var strategy = new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX',
        userProfileURL: 'https://www.googleapis.com/plus/v1/people/me'
      }, function() {});
    
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://www.googleapis.com/plus/v1/people/me') { return callback(new Error('incorrect url argument')); }
      
      var body = '{\n "error": "invalid_request",\n "error_description": "Invalid Credentials"\n}\n';
      callback({ statusCode: 401, data: body });
    };
      
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('invalid-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('UserInfoError');
      expect(err.message).to.equal("Invalid Credentials");
      expect(err.code).to.equal('invalid_request');
    });
  }); // error caused by invalid token when using user info endpoint
  
  describe('error caused by malformed response', function() {
    var strategy =  new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX'
      }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = 'Hello, world.';
      callback(null, body, undefined);
    };
    
    
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  }); // error caused by malformed response
  
  describe('internal error', function() {
    var strategy =  new GoogleStrategy({
        clientID: '46055328831-ti3v2lkfqiqut3vmck3pipcsfq4eij88.apps.googleusercontent.com',
        clientSecret: 'Lr_jLo0Gw5jiydDqV9zrXHVX'
      }, function verify(){});
    
    strategy._oauth2.get = function(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    }
    
    
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });
    
    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // internal error
  
});

module.exports = {
  DeliveredTo: 'alexhong742@gmail.com',
  Received: `by 10.223.166.166 with SMTP id t35csp732492wrc;
          Thu, 7 Sep 2017 14:36:35 -0700 (PDT)`,
  'X-Google-Smtp-Source': 'ADKCNb6z/VtuLuAsVQmvC2dA/y3pJgXi2wxfgD7wPmzBXRNRzTQXpvaaAX5uLGQU/FO/UDSJC3IJ',
  'X-Received': `by 10.84.168.98 with SMTP id e89mr849737plb.292.1504820195221;
          Thu, 07 Sep 2017 14:36:35 -0700 (PDT)`,
  'ARC-Seal': `i=1; a=rsa-sha256; t=1504820195; cv=none;
          d=google.com; s=arc-20160816;
          b=URn64fDpBUZfm+rRS7riNLeu73V8Dqu2nlo/7G9hdmf978hSHtOyMyLXnWYvOrghGM
           512cXHG6i3SDEo1aiwF5mzi+S0LdbV9MoKM/6ef+1EkYQPZHBk3ycvBoTFcVru7u41XL
           fjwgvUocN9F/X4ztIWonWWqJCqPdjo3o50wLhLwcn7SmpI05dT2e4AmnFZlha4t0CykJ
           BS5vHvgo2YYwctWBtxisV5rvIWdEyPVx6whIsEK3FhTuWmSrS0SiMntgZ21h/l7Ox7FM
           NrfxSGjfe1SWjA9MK1uwA1aYEZCgTM8Q+ctHq5BoNlR1TF1BSoSQN/Jw1QITtMPegi3T
           HK9w==`,
  'ARC-Message-Signature': `i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;
          h=categories:tracking:mime-version:subject:message-id:to:from:date
           :dkim-signature:dkim-signature:arc-authentication-results;
          bh=73sGmeL9Z1oKEhK2Nq7Alxhx1PXkMNX1JSQcRLAT3VA=;
          b=KMTbYxzLTrxZacisZPqGqMd5qqrhVFnNzLibA/wdRCjWZ4sZ3Hk7lwddG4U6L0y6TL
           FtrxuQqrMMGj76jtKAI0ewLiNzXgXD+r/ctAi4GZlBo7ExbB8bbupnsuNBELQjbhc6cR
           W4gbZBUGS07XNLG2r2su3WR6nmDkyn8Gt4fu4E6KUT2FCk0mk3j27toMNiszXZQWRjlA
           331SQJB+gGbEQK8M4AjvXNA/RReauyEh/0pEVnRS+Ztei05NKPWYfK6Gqz7yoC/KXna4
           wmh0KlPGlzqENGP8S6fesIJTp7N0GtYe7Qlz+mPoa5aIEAB4NLwSKKLyw+R3heHQZZ8V
           KPbg==`,
  'ARC-Authentication-Results': `i=1; mx.google.com;
         dkim=pass header.i=@github.com header.s=s20150108 header.b=pZSjgEPW;
         dkim=pass header.i=@sendgrid.info header.s=smtpapi header.b=JdISKCud;
         spf=pass (google.com: domain of bounces+848413-d729-alexhong742=gmail.com@sgmail.github.com designates 192.254.112.99 as permitted sender) smtp.mailfrom=bounces+848413-d729-alexhong742=gmail.com@sgmail.github.com;
         dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=github.com`,
  'Content-Type': 'text/html; charset=\'UTF-8\'',
  'Content-Disposition': 'inline',
  'Content-Transfer-Encoding': '7bit',
  body:
  `<html><body>
  <p>You have been granted admin access to TakCloud. Admins have full rights to the organization and have complete access to all repositories and teams.</p>
  <p>View all TakCloud admins: <a href='http://sgmail.githubmail.com/wf/click?upn=lYxq-2FYU7yocrdKNILYalBp4CMvAuWey0hh-2F513SYwdTJJ02mwqM9Lf3P1A4k5OTWfQzRC8cH6LHfq89gOyb4HCVWqK9xLJBWAhv7pXbvQv0-3D_vr-2Fh9w0ce-2BQhwA1hfM-2FjBdFqrNU5lJawEnQ2RWB6r-2B9e6qgKQMfv76Fa5Fi9RN0biX6WZMX1cWezaG9Vi3uvvDLy2Ssfj0yp84iGG0R8RHAnwkGRlRjwtYEz6axl52XonTSaJO-2Bvjnso5IDsK3yb2rS49SSzOB8hwLujNL8hsL2fisUJbeTyRlLfth21e8blE27JhG8lj5NrI3CAnanKoV-2BsG9iFTyYNcB4HdqEFZrpta9Hq3XruC4DE00ssIPhnpxT-2BSZW-2BHnhWMUbmLgzmlw-3D-3D'>https://github.com/orgs/TakCloud/people?query=role%3Aowner</a></p>
  <p>Read more about organization permissions at: <a href='http://sgmail.githubmail.com/wf/click?upn=H-2FQ3yMxnv4jw-2BxNnSBX80-2FAtA3t7vDbetmbWolVUHkKnECwCpEvOzzuUPQYp7N5nJUUw2cmfrHRG97c2sliHmk6ikazvvoK4oP-2BoW9tDRWyP7tZt9qLToyQhJJAuHQy2nbVmn7NAZS-2BXS0Wz6nSIig-3D-3D_vr-2Fh9w0ce-2BQhwA1hfM-2FjBdFqrNU5lJawEnQ2RWB6r-2B9e6qgKQMfv76Fa5Fi9RN0bVoM-2Fa0i7cZ7YoTcXfclmLUrpdI6oyCPdvZrQOwu1NBSLTrPNSJACxc-2FqdW0hZUYiU9D5SqgimGeZXTs4pOxlIhxUmO-2B8WssjzgfMh-2FKFrKlg-2FXZAY0i7j7-2BkhXkULo8ZvHv9WZ4j9DzYIwmI8qGjty-2F5p0M9SmeK1CLgC86hvOruP2NlldGOuN7tQ9jGKLWncRuKn0E9zjTPs8LdPTv1uA-3D-3D'>https://help.github.com/articles/what-are-the-different-access-permissions/#organization-accounts</a></p>
  
  <img src='http://sgmail.githubmail.com/wf/open?upn=vr-2Fh9w0ce-2BQhwA1hfM-2FjBdFqrNU5lJawEnQ2RWB6r-2B9e6qgKQMfv76Fa5Fi9RN0bs6JmRvyrDZjuAdFtuzgIJjo5lSV-2BR-2B0Om6bzeYv-2FnjGxzSH121P964TrCVvnN0S59dIqXJTlF8pMTuAztD2TpigkDLkNZBV9Nlx8Fjqs1wJMOEDkUuzk0WyV-2B8S58KVgYdaU7t-2FiNhrffjfqveTVrQ-2BGKUo6-2FAvRce1j6gKA0dVsMKGedk2IynMOL-2BBzRgwK2KC97ARZGLc4MgDF75HuuA-3D-3D' alt='' width='1' height='1' border='0' style='height:1px !important;width:1px !important;border-width:0 !important;margin-top:0 !important;margin-bottom:0 !important;margin-right:0 !important;margin-left:0 !important;padding-top:0 !important;padding-bottom:0 !important;padding-right:0 !important;padding-left:0 !important;'/>
  </body></html>
  `,
};

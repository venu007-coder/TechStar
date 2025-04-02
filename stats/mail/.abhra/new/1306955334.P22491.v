Return-Path: steve.bahwan@gmail.com
Received: from mx06.stngva01.us.mxservers.net (204.202.242.35)
	by mail19e.g19.rapidsite.net (RS ver 1.0.95vs) with SMTP id 4-087015334
	for <abhra@altechstar.com>; Wed,  1 Jun 2011 15:08:54 -0400 (EDT)
Received: from unknown [74.125.83.56] (EHLO mail-gw0-f56.google.com)
	by va1-mx06.stngva01.us.mxservers.net (mxl_mta-3.1.0-05)
	with ESMTP id 64e86ed4.586107808.1068591.00-006.va1-mx06.stngva01.us.mxservers.net (envelope-from <aruntrusa+bncclyo-dhkdxcjnjrvbboekf6mjq@googlegroups.com>);
	Wed, 01 Jun 2011 15:08:54 -0400 (EDT)
Received: by gwaa11 with SMTP id a11sf79194gwa.21
        for <abhra@altechstar.com>; Wed, 01 Jun 2011 12:08:54 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=googlegroups.com; s=beta;
        h=domainkey-signature:x-beenthere:received-spf:mime-version
         :in-reply-to:references:date:message-id:subject:from:to
         :x-original-sender:x-original-authentication-results:reply-to
         :precedence:mailing-list:list-id:x-google-group-id:list-post
         :list-help:list-archive:sender:list-subscribe:list-unsubscribe
         :content-type;
        bh=YC9C2ZnfEvSkKRWNQi0S2Hn3N1o737h6L/KBhRajzTw=;
        b=lJIeRxbJ06cIIPaOZKgIpwzmRJcE6e5WnQprDz5vxKDJ3wY1vls0mHVi2O2J1YooeG
         oRn06Phdk3w+RYEOkgjgOmi+9y+nnKi6huErjEx/vEwhId5vbYWiObb1EsU9QucUkwpU
         8EpCOtfo+XyYf9C+MSuXGaLP0pEdDpA2OSrUc=
DomainKey-Signature: a=rsa-sha1; c=nofws;
        d=googlegroups.com; s=beta;
        h=x-beenthere:received-spf:bcc:mime-version:in-reply-to:references
         :date:message-id:subject:from:to:x-original-sender
         :x-original-authentication-results:reply-to:precedence:mailing-list
         :list-id:x-google-group-id:list-post:list-help:list-archive:sender
         :list-subscribe:list-unsubscribe:content-type;
        b=u1Ox4Xv6l4oaUq+BmvfrWsrQG2rOkwIXs2hSsYypml8kNglSjQYhwN4Vv3YJERI4jn
         C4G+lKNQj7PnOBRzakSgkisQmoIQDKGj6BApzIgKoDkkU+SgiqlDx3Yatv7asJ35KyJz
         vB5K01xYjYZiJtLBJUZ/7IN20Gv3Sdvnt1JyE=
Received: by 10.151.88.21 with SMTP id q21mr1260289ybl.80.1306955273253;
        Wed, 01 Jun 2011 12:07:53 -0700 (PDT)
X-BeenThere: aruntrusa@googlegroups.com
Received: by 10.150.213.9 with SMTP id l9ls662934ybg.4.gmail; Wed, 01 Jun 2011
 12:07:52 -0700 (PDT)
Received: by 10.236.138.194 with SMTP id a42mr4896990yhj.9.1306955271975;
        Wed, 01 Jun 2011 12:07:51 -0700 (PDT)
Received: by 10.236.138.194 with SMTP id a42mr4896988yhj.9.1306955271933;
        Wed, 01 Jun 2011 12:07:51 -0700 (PDT)
Received: from mail-gw0-f46.google.com (mail-gw0-f46.google.com [74.125.83.46])
        by gmr-mx.google.com with ESMTPS id l51si937852yhe.1.2011.06.01.12.07.51
        (version=TLSv1/SSLv3 cipher=OTHER);
        Wed, 01 Jun 2011 12:07:51 -0700 (PDT)
Received-SPF: pass (google.com: domain of steve.bahwan@gmail.com designates 74.125.83.46 as permitted sender) client-ip=74.125.83.46;
Received: by mail-gw0-f46.google.com with SMTP id a18so48752gwa.19
        for <aruntrusa@googlegroups.com>; Wed, 01 Jun 2011 12:07:51 -0700 (PDT)
Bcc: aruntrusa@googlegroups.com
MIME-Version: 1.0
Received: by 10.90.187.16 with SMTP id k16mr1080243agf.209.1306955271542; Wed,
 01 Jun 2011 12:07:51 -0700 (PDT)
Received: by 10.90.114.10 with HTTP; Wed, 1 Jun 2011 12:07:51 -0700 (PDT)
In-Reply-To: <BANLkTimpJoqeXiL_JcXF+au8a-i=1Wx7eg@mail.gmail.com>
References: <BANLkTingYu-FPgrLC_d1C4Xu9ivfTH_4DQ@mail.gmail.com>
	<BANLkTikfKEoto9Jynhyv+EpE-iJDpfk=5A@mail.gmail.com>
	<BANLkTi=EBqQh2E-jGoGR1ER1ZqcrnwG6bQ@mail.gmail.com>
	<BANLkTikejqK_pb=KrE7cxBbQap0TTVcapg@mail.gmail.com>
	<BANLkTinY01crkdNk78p=VYy+zWFRLHFXKQ@mail.gmail.com>
	<BANLkTikLoDcFXtZjGxoG=UocA8KfOcK4iQ@mail.gmail.com>
	<BANLkTim5jbP35LaCF6LfH5SfrJ=A0_warw@mail.gmail.com>
	<BANLkTin7Fnv=f8-96jiW_CVdatuXk3Tn-w@mail.gmail.com>
	<BANLkTinY6USk6feaafcxtkTU2L4KEuYc-Q@mail.gmail.com>
	<BANLkTi=xY7L5ejku3w36jzwrvvZSVBV9sA@mail.gmail.com>
	<BANLkTimr7iY0bSp6Fn9htcYL3V5N20jGSQ@mail.gmail.com>
	<BANLkTimpJoqeXiL_JcXF+au8a-i=1Wx7eg@mail.gmail.com>
Date: Wed, 1 Jun 2011 15:07:51 -0400
Message-ID: <BANLkTikjT8qwd3iMMSDQ5SOvhN3SMHJS8A@mail.gmail.com>
Subject: Arun Chandupatla OBIEE Developer Job Opening @ Concord, MA
From: OBIEE Developer <steve.bahwan@gmail.com>
To: undisclosed-recipients:;
X-Original-Sender: steve.bahwan@gmail.com
X-Original-Authentication-Results: gmr-mx.google.com; spf=pass (google.com:
 domain of steve.bahwan@gmail.com designates 74.125.83.46 as permitted sender)
 smtp.mail=steve.bahwan@gmail.com; dkim=pass (test mode) header.i=@gmail.com
Reply-To: steve.bahwan@gmail.com
Precedence: list
Mailing-list: list aruntrusa@googlegroups.com; contact aruntrusa+owners@googlegroups.com
List-ID: <aruntrusa.googlegroups.com>
X-Google-Group-Id: 284064291431
List-Post: <http://groups.google.com/group/aruntrusa/post?hl=en-GB_IN>, <mailto:aruntrusa@googlegroups.com>
List-Help: <http://groups.google.com/support/?hl=en-GB_IN>, <mailto:aruntrusa+help@googlegroups.com>
List-Archive: <http://groups.google.com/group/aruntrusa?hl=en-GB_IN>
Sender: aruntrusa@googlegroups.com
List-Subscribe: <http://groups.google.com/group/aruntrusa/subscribe?hl=en-GB_IN>,
 <mailto:aruntrusa+subscribe@googlegroups.com>
List-Unsubscribe: <http://groups.google.com/group/aruntrusa/subscribe?hl=en-GB_IN>,
 <mailto:aruntrusa+unsubscribe@googlegroups.com>
Content-Type: multipart/alternative; boundary="=_reb-r35B34763-t4DE68E46"
X-Processed-By: Rebuild v2.0-0
X-Spam: [F=0.2000000000; B=0.500(0); S=0.200(2010122901); MH=0.500(2011060125)]
X-MAIL-FROM: <aruntrusa+bncclyo-dhkdxcjnjrvbboekf6mjq@googlegroups.com>
X-SOURCE-IP: [74.125.83.56]
X-SF-Loop: 1

This is a multi-part MIME message.

--=_reb-r35B34763-t4DE68E46
Content-Type: text/plain; charset=ISO-8859-1
Content-Transfer-Encoding: quoted-printable

Hi

We have the below *OBIEE Developer *position open with us for Contract to
Hire. If you are interested kindly respond me back with your updated resume
along with the contact information and expected billing rate to *
surendra.n@bahwancybertek.com*



*Position: OBIEE Developer *

*Location: Concord, MA*

*Duration: 3-6 months Contract To Hire *

*Rate: DOE*



*Requirements:   *

=B7         Must be self-motivated, inquisitive, with a proven track record=
 of
planning and meeting goals.

=B7         This position will require good knowledge of business processes

=B7         Working knowledge of information systems system and concepts

=B7         *Must have solid experience on SQL, ETL and Web Catalog. *

=B7         Competency with PC and desktop applications (e.g., MS Office,
Outlook, etc.)

=B7         Working knowledge of applicable methodologies, tools, standards,
and procedures

=B7         Experience using formal development processes and/or methodolog=
ies

=B7         Develop documents, test, support and implement software
applications

=B7         Must be experienced with OBIEE, informatica, XML, SQL, PL/SQL,
T-SQL,SMTP, DTS, SSIS, Oracle Databases, SQL Server Databases, Documentum,
Knowledge of MSMQ and API experience a plus

=B7         8+ years of experience in the IT industry with a minimum of 5
years of experience in data warehouse design and dashboard development, SQL,
PL/SQL, T-SQL, OBIEE, Informatica and search engines





* *

*Thanks & regards,*



*Surendra Babu *

*Bahwan CyberTek, Inc.*

*209 West Central Street, Suite # 312**, Natick MA 01760** *

*Web: www.bahwancybertek.com*

*[image: Phone] (508 507 8340)  (508) 652-9781*

--=20
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.
To post to this group, send an email to aruntrusa@googlegroups.com.
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.
For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.


--=_reb-r35B34763-t4DE68E46
Content-Type: text/html; charset=ISO-8859-1
Content-Transfer-Encoding: quoted-printable

Hi=A0 <br><div class=3D"gmail_quote"><div class=3D"gmail_quote"><div><div c=
lass=3D"h5"><div><div class=3D"gmail_quote"><div><div class=3D"gmail_quote"=
><div><div class=3D"gmail_quote">
<div><div class=3D"gmail_quote"><div><div class=3D"gmail_quote"><div><div c=
lass=3D"gmail_quote"><div><div class=3D"gmail_quote"><div><div class=3D"gma=
il_quote">
<div><div class=3D"gmail_quote">
<font face=3D"Arial" size=3D"2"><span style=3D"font-size: 10pt; font-family=
: Arial;"></span></font>
<p style=3D"margin-left: 0in;"><font face=3D"Arial" size=3D"2"><span style=
=3D"font-size: 10pt; font-family: Arial;">We have the below <b><span style=
=3D"font-weight: bold;">OBIEE Developer </span></b>position open with us fo=
r=20
Contract to Hire. If you are interested kindly respond me back with your up=
dated=20
resume along with the contact information and expected billing rate to <fon=
t color=3D"navy"><span style=3D"color: navy;"><font size=3D"4"><b><a target=
=3D"_blank" href=3D"mailto:surendra.n@bahwancybertek.com" title=3D"mailto:s=
urendra.n@bahwancybertek.com">surendra.n@bahwancybertek.com</a></b></font>=
=20
</span></font></span></font></p>
<p style=3D"margin-left: 0in;"><font face=3D"Arial" size=3D"2" color=3D"nav=
y"><span style=3D"font-size: 10pt; color: navy; font-family: Arial;">=A0</s=
pan></font></p>
<p style=3D"margin-left: 0in;"><b><font face=3D"Arial" size=3D"2"><span sty=
le=3D"font-weight: bold; font-size: 10pt; font-family: Arial;">Position: OB=
IEE=20
Developer </span></font></b></p>
<p style=3D"margin-left: 0in;"><b><font face=3D"Arial" size=3D"2"><span sty=
le=3D"font-weight: bold; font-size: 10pt; font-family: Arial;">Location:=20
Concord, MA</span></font></b></p>
<p style=3D"margin-left: 0in;"><b><font face=3D"Arial" size=3D"2"><span sty=
le=3D"font-weight: bold; font-size: 10pt; font-family: Arial;">Duration: 3-=
6=20
months Contract To Hire </span></font></b></p>
<p style=3D"margin-left: 0in;"><b><font face=3D"Arial" size=3D"2"><span sty=
le=3D"font-weight: bold; font-size: 10pt; font-family: Arial;">Rate:=20
DOE</span></font></b><font face=3D"Arial" size=3D"2"><span style=3D"font-si=
ze: 10pt; font-family: Arial;"> </span></font></p>
<p class=3D"MsoNormal"><font face=3D"Arial" size=3D"2" color=3D"navy"><span=
 style=3D"font-size: 10pt; color: navy; font-family: Arial;">=A0</span></fo=
nt></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2"><span style=3D"fo=
nt-weight: bold; font-size: 10pt; font-family: Arial;">Requirements:=A0=A0=
=20
</span></font></b></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Must be self-motivated,=20
inquisitive,</span></font><font face=3D"Arial" color=3D"#333333"><span styl=
e=3D"color: rgb(51, 51, 51); font-family: Arial;"> </span></font><font face=
=3D"Arial" color=3D"black"><span style=3D"color: black; font-family: Arial;=
">with a proven track=20
record of planning and meeting goals. </span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">This position will require g=
ood=20
knowledge of business processes </span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Working knowledge of informa=
tion=20
systems system and concepts</span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2"><span st=
yle=3D"font-size: 10pt; font-family: Symbol;"><span>=B7<font face=3D"Times =
New Roman" size=3D"1"><span style=3D"font-family: &#39;Times New Roman&#39;=
; font-style: normal; font-variant: normal; font-weight: normal; font-size:=
 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">=
=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><b><font face=3D"Arial"><span style=3D"f=
ont-weight: bold; font-family: Arial;">Must have solid experience on SQL,=
=20
ETL and Web Catalog. </span></font></b></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"#333333"><span style=3D"font-size: 10pt; color: rgb(51, 51, 51); font-fami=
ly: Symbol;"><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=
=3D"font-family: &#39;Times New Roman&#39;; font-style: normal; font-varian=
t: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-s=
ize-adjust: none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Competency with PC and deskt=
op=20
applications (e.g., MS Office, Outlook, etc.) </span></font><font face=3D"A=
rial" color=3D"#333333"><span style=3D"color: rgb(51, 51, 51); font-family:=
 Arial;"></span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Working knowledge of applica=
ble=20
methodologies, tools, standards, and procedures </span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Experience using formal deve=
lopment=20
processes and/or methodologies</span></font></p>
<p style=3D"line-height: 10.5pt;"><font face=3D"Symbol" size=3D"2" color=3D=
"black"><span style=3D"font-size: 10pt; color: black; font-family: Symbol;"=
><span>=B7<font face=3D"Times New Roman" size=3D"1"><span style=3D"font-fam=
ily: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; f=
ont-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: =
none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"black"><sp=
an style=3D"color: black; font-family: Arial;">Develop documents, test, sup=
port and=20
implement software applications</span></font></p>
<p><font face=3D"Symbol" size=3D"2"><span style=3D"font-size: 10pt; font-fa=
mily: Symbol;"><span>=B7<font face=3D"Times New Roman" size=3D"1"><span sty=
le=3D"font-family: &#39;Times New Roman&#39;; font-style: normal; font-vari=
ant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font=
-size-adjust: none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"#333333"><=
span style=3D"color: rgb(51, 51, 51); font-family: Arial;">Must be experien=
ced with OBIEE,=20
informatica, XML, SQL, PL/SQL, T-SQL,SMTP, DTS, SSIS, Oracle Databases, SQL=
=20
Server Databases, Documentum, Knowledge of MSMQ and API experience a=20
plus</span></font><font face=3D"Arial"><span style=3D"font-family: Arial;">=
</span></font></p>
<p><font face=3D"Symbol" size=3D"2"><span style=3D"font-size: 10pt; font-fa=
mily: Symbol;"><span>=B7<font face=3D"Times New Roman" size=3D"1"><span sty=
le=3D"font-family: &#39;Times New Roman&#39;; font-style: normal; font-vari=
ant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font=
-size-adjust: none; font-stretch: normal;">=A0=A0=A0=A0=A0=A0=A0=A0=20
</span></font></span></span></font><font face=3D"Arial" color=3D"#333333"><=
span style=3D"color: rgb(51, 51, 51); font-family: Arial;">8+ years of expe=
rience in the IT=20
industry with a minimum of 5 years of experience in data warehouse design a=
nd=20
dashboard development, SQL, PL/SQL, T-SQL, OBIEE, Informatica and search=20
engines</span></font><font face=3D"Arial"><span style=3D"font-family: Arial=
;"></span></font></p>
<p style=3D"margin-left: 0in;"><font face=3D"Arial" size=3D"2" color=3D"#33=
3333"><span style=3D"font-size: 10pt; color: rgb(51, 51, 51); font-family: =
Arial;">=A0</span></font></p>
<p style=3D"margin-left: 0in;"><font face=3D"Arial" size=3D"2" color=3D"#33=
3333"><span style=3D"font-size: 10pt; color: rgb(51, 51, 51); font-family: =
Arial;">=A0</span></font></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">=A0</span></font></b></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">Thanks=20
&amp; regards,</span></font></b></p>
<p class=3D"MsoNormal"><font face=3D"Arial" size=3D"2" color=3D"#3366cc"><s=
pan style=3D"font-size: 10pt; color: rgb(51, 102, 204); font-family: Arial;=
">=A0</span></font></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">Surendra=20
Babu </span></font></b></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">Bahwan=20
CyberTek, Inc.</span></font></b></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">209=20
West Central Street, Suite # 312</span></font></b><b><font face=3D"Arial" s=
ize=3D"2" color=3D"#3366cc"><span style=3D"font-weight: bold; font-size: 10=
pt; color: rgb(51, 102, 204); font-family: Arial;">,=A0Natick MA 01760</spa=
n></font></b><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"><span sty=
le=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204); font-fa=
mily: Arial;">=20
</span></font></b></p>
<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;">Web:=20
<a target=3D"_blank" href=3D"http://www.bahwancybertek.com/" title=3D"http:=
//www.bahwancybertek.com/"><font color=3D"#3366cc" title=3D"http://www.bahw=
ancybertek.com/"><span title=3D"http://www.bahwancybertek.com/"><span title=
=3D"http://www.bahwancybertek.com/"><span style=3D"color: rgb(51, 102, 204)=
;" title=3D"http://www.bahwancybertek.com/"><span title=3D"http://www.bahwa=
ncybertek.com/"><span title=3D"http://www.bahwancybertek.com/">www.bahwancy=
bertek.com</span></span></span></span></span></font></a></span></font></b><=
/p>













<p class=3D"MsoNormal"><b><font face=3D"Arial" size=3D"2" color=3D"#3366cc"=
><span style=3D"font-weight: bold; font-size: 10pt; color: rgb(51, 102, 204=
); font-family: Arial;"><img height=3D"18" width=3D"18" border=3D"0" alt=3D=
"Phone" src=3D"http://portal.mxlogic.com/images/transparent.gif">=A0(508 50=
7 8340) <img height=3D"19" width=3D"21" border=3D"0" src=3D"http://portal.m=
xlogic.com/images/transparent.gif">=A0(508)=20
652-9781</span></font></b></p>
<p class=3D"MsoNormal"><font face=3D"Arial" size=3D"2" color=3D"#3366cc"><s=
pan style=3D"font-size: 10pt; color: rgb(51, 102, 204); font-family: Arial;=
"><img height=3D"43" width=3D"28" border=3D"0" src=3D"http://portal.mxlogic=
.com/images/transparent.gif">=A0<img height=3D"33" width=3D"298" border=3D"=
0" src=3D"http://portal.mxlogic.com/images/transparent.gif"></span></font><=
/p>












</div><div><br>
</div></div></div><div><div class=3D"gmail_quote"><div><div><br>
</div></div></div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div><div><br>
</div></div></div></div></div><br>
</div><br>

<p></p>

-- <br>
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.<br>
To post to this group, send an email to aruntrusa@googlegroups.com.<br>
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.<br>

For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.<br>



--=_reb-r35B34763-t4DE68E46--


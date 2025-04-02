Return-Path: anil@avcoconsulting.com
Received: from mx07.stngva01.us.mxservers.net (204.202.242.99)
	by mail19i.g19.rapidsite.net (RS ver 1.0.95vs) with SMTP id 2-0321175732
	for <abhra@altechstar.com>; Sun,  7 Aug 2011 18:22:12 -0400 (EDT)
Received: from unknown [209.85.212.56] (EHLO mail-vw0-f56.google.com)
	by va1-mx07.stngva01.us.mxservers.net (mxl_mta-3.1.0-05)
	with ESMTP id 4101f3e4.2511510432.212034.00-002.va1-mx07.stngva01.us.mxservers.net (envelope-from <aruntrusa+bnccidtnuvggxdzn_zxbboednj1ag@googlegroups.com>);
	Sun, 07 Aug 2011 18:22:12 -0400 (EDT)
Received: by vws15 with SMTP id 15sf550114vws.21
        for <abhra@altechstar.com>; Sun, 07 Aug 2011 15:22:12 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=googlegroups.com; s=beta;
        h=x-beenthere:received-spf:x-yahoo-newman-id:x-yahoo-newman-property
         :x-ymail-osg:x-yahoo-smtp:x-rim-org-msg-ref-id:message-id:reply-to
         :x-priority:references:in-reply-to:sensitivity:importance:subject:to
         :from:date:mime-version:x-original-sender
         :x-original-authentication-results:precedence:mailing-list:list-id
         :x-google-group-id:list-post:list-help:list-archive:sender
         :list-subscribe:list-unsubscribe:content-type;
        bh=r41OdRrC9DMDblvzMAiONGe+wRthrHVe3ZccURIdIQc=;
        b=MztD7z8QOs6ns81zJNCnmNsRFHrBpbgUCsepgUzbqHWNa+MlnWkegQp+rCr+bsyFtl
         yG5NvTYmqTK4PJ6ZvFwuXzABIaeZDrovrxbzsrbg+0Cx6K5Zo/plfVGaFOLPRq6KSoWR
         LwteeQ34gZLFI/q1dMl2Mj2aZ+TONnfpQWdig=
Received: by 10.220.154.66 with SMTP id n2mr661748vcw.11.1312755673433;
        Sun, 07 Aug 2011 15:21:13 -0700 (PDT)
X-BeenThere: aruntrusa@googlegroups.com
Received: by 10.220.210.3 with SMTP id gi3ls757142vcb.5.gmail; Sun, 07 Aug
 2011 15:21:12 -0700 (PDT)
Received: by 10.52.69.235 with SMTP id h11mr162998vdu.34.1312755672481;
        Sun, 07 Aug 2011 15:21:12 -0700 (PDT)
Received: by 10.52.69.235 with SMTP id h11mr162997vdu.34.1312755672458;
        Sun, 07 Aug 2011 15:21:12 -0700 (PDT)
Received: from nm24-vm0.bullet.mail.bf1.yahoo.com (nm24-vm0.bullet.mail.bf1.yahoo.com [98.139.213.161])
        by gmr-mx.google.com with SMTP id h2si6957167vdv.0.2011.08.07.15.21.11;
        Sun, 07 Aug 2011 15:21:11 -0700 (PDT)
Received-SPF: neutral (google.com: 98.139.213.161 is neither permitted nor denied by best guess record for domain of anil@avcoconsulting.com) client-ip=98.139.213.161;
Received: from [98.139.212.151] by nm24.bullet.mail.bf1.yahoo.com with NNFMP; 07 Aug 2011 22:21:11 -0000
Received: from [98.139.212.242] by tm8.bullet.mail.bf1.yahoo.com with NNFMP; 07 Aug 2011 22:21:11 -0000
Received: from [127.0.0.1] by omp1051.mail.bf1.yahoo.com with NNFMP; 07 Aug 2011 22:21:11 -0000
X-Yahoo-Newman-Id: 8046.38705.bm@omp1051.mail.bf1.yahoo.com
Received: (qmail 16029 invoked from network); 7 Aug 2011 22:21:10 -0000
X-Yahoo-Newman-Property: ymail-3
X-YMail-OSG: QrgXF1QVM1my6KyHRtfynlUpEo9gNDTAzShBxsFJU32Up58
 yE0kyN_jLkeNXxzTLOhRneVvZlZ82iv2VxU0B6c3HNqiKuDuACsR2qWxpZTi
 yQaL0YAq3ZnryhR3GDAPHgv_YiTdn53F9sKHm97WtZLjx2poDDz5p6mjQ_dR
 j4awNWsCBbsUFrn4yXlQUJl1mfBKoWcJYXr76CFwBAq4NyxmUgXSgrg4V9J1
 JgscT95DkupNchL.kinZHmy343nydM8MqPZm_GAh.oGQNV664SPWfDKg1GyK
 h6TomNRScRwkTOOBkv6dkSEWovmAxd.jJ77n6OZ63qrnGP8LtHlrk9GIWvut
 oq.HuRLESyuUVw2vv1IWVax6mBQHqOeik8m_qwyzW6mvXPML1YZVfIzTGduP
 wFz6jJMjqM0jzcUs5affyhNkU6C9ez..pUpdXH3aKTw3hdpt64HTHZRHuRbF
 jmft7FqK1jciuR7uc2gPFubpa8mEP1t0yt1Mz9ZNNbEzKc.hs8lgzRReaXoe
 Tt8DWrgnPenz4mMIceVLXFsd1Wt3prStONEzMrQs.sfSWcLvp7Fuj3D8f2OO
 QdHD0H.h9_tBjhuwzUQ1nJMUD7I.ZK3doUC0Vf3GGOZY3yuqCHej9GOXtLMv
 .HRAd9i0B0rT1PKXyN_7K7ul_j.AO.jf5j6UI0oGlcjo2MLzCQDYAmGS6HJn
 aNkqH5IOPF73_oTUAOjuC3R3veCYXWWxSTDELs1AutY2gH0dX5LwkhXIbKmL
 VsWSle.Hi0BSYc_SY1S_r08LfNzDg5_vlktJLL7fPGIhG5Ix9RBE5x.1m_BD
 cH2owalVOCLAxnoRKPW6ticX3AruwllKQDoj1npZ8yAYMWNJH4Cc5
X-Yahoo-SMTP: s7VLcBOswBCZ1XwwwUWIXuRWiXmjuw--
Received: from b25.c21.bise6.blackberry (anil@74.82.85.127 with xymcookie)
        by smtp113-mob.biz.mail.bf1.yahoo.com with SMTP; 07 Aug 2011 15:21:10 -0700 PDT
X-rim-org-msg-ref-id: 1608333140
Message-ID: <1608333140-1312755669-cardhu_decombobulator_blackberry.rim.net-1613825715-@b27.c21.bise6.blackberry>
Reply-To: anil@avcoconsulting.com
X-Priority: Normal
References: <CAChBhfvG9hud=t_dLOrW8qaZ8X4Hxid19osLqF+6Ee7w7bVjSQ@mail.gmail.com>
In-Reply-To: <CAChBhfvG9hud=t_dLOrW8qaZ8X4Hxid19osLqF+6Ee7w7bVjSQ@mail.gmail.com>
Sensitivity: Normal
Importance: Normal
Subject: Re: Arun Chandupatla Repeaters 2011 DVDRip XviD-playXD
To: nehircem9@gmail.com
From: anil@avcoconsulting.com
Date: Sun, 7 Aug 2011 22:21:08 +0000
MIME-Version: 1.0
X-Original-Sender: anil@avcoconsulting.com
X-Original-Authentication-Results: gmr-mx.google.com; spf=neutral (google.com:
 98.139.213.161 is neither permitted nor denied by best guess record for
 domain of anil@avcoconsulting.com) smtp.mail=anil@avcoconsulting.com;
 dkim=pass (test mode) header.i=@yahoo.com
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
Content-Type: multipart/alternative; boundary="=_reb-r672A1775-t4E3F1014"
X-Processed-By: Rebuild v2.0-0
X-Spam: [F=0.2000000000; B=0.500(0); S=0.200(2010122901); MH=0.500(2011080708)]
X-MAIL-FROM: <aruntrusa+bnccidtnuvggxdzn_zxbboednj1ag@googlegroups.com>
X-SOURCE-IP: [209.85.212.56]
X-SF-Loop: 1

This is a multi-part MIME message.

--=_reb-r672A1775-t4E3F1014
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain; charset=windows-1252

Remove!!!!!
Sent on the Now Network=99 from my Sprint=AE BlackBerry

-----Original Message-----
From: Nehir Deniz <nehircem9@gmail.com>
Sender: aruntrusa@googlegroups.com
Date: Sun, 7 Aug 2011 21:35:22=20
Reply-To: nehircem9@gmail.com
Subject: Arun Chandupatla Repeaters 2011 DVDRip XviD-playXD

 Repeaters 2011 DVDRip XviD-playXD

*
 <http://www.rlslog.net/repeaters-2011-dvdrip-xvid-playxd/> *



Here is interesting scifi thriller =93Repeaters=94 released by p2p group pl=
ayXD.
*Plot:* REPEATERS is an aggressive, fast-paced with an important moral
question: what would you do if you knew that everyday you started over with
a clean slate? Sonia, Kyle and Weeks are three cynical outsiders fed up with
the peer groups and the perceived injustices inflicted upon their early
adult lives. Forced into mandatory rehab, the trio is given a day pass to
attempt to complete step nine on the path to recovery =96 make direct amends
with those they have wronged in the past. Upon acceptance of their
predicament, the three begin to behave with more confidence and bravado
because surely their misdeeds will be erased if the day continues to repeat
itself. Accordingly, they set out pulling pranks and committing petty
revenges, but things soon escalate, culminating in the torture and
kidnapping of a rival.
Click this bar to view the original image of 520x329px.
*Genre:* Drama | Sci-Fi | Thriller
*IMDB rating:* 6/10 (32 votes)
*Directed by:* Carl Bessai
*Starring:* Dustin Milligan, Amanda Crew, Richard de Klerk, Benjamin Ratner
*Release Name*: Repeaters.2011.DVDRip.XviD-playXD
*Size*: 705.44 MB
*Quality*: 640=D7272, 968 Kbps, MP3 Audio
*Runtime*: 89 min
*Filename*: Repeaters.2011.DVDRip.XviD-playXD




http://www.wupload.com/file/82665326...viD-playXD.avi<http://www.wupload.co=
m/file/82665326/Repeaters.2011.DVDRip.XviD-playXD.avi>
OR
http://www.wupload.com/file/82665327...viD-playXD.avi<http://www.wupload.co=
m/file/82665327/Repeaters.2011.DVDRip.XviD-playXD.avi>
OR
http://www.wupload.com/file/82665329...viD-playXD.avi<http://www.wupload.co=
m/file/82665329/Repeaters.2011.DVDRip.XviD-playXD.avi>

OR

http://www.wupload.com/file/82665328...viD-playXD.rar<http://www.wupload.co=
m/file/82665328/Repeaters.2011.DVDRip.XviD-playXD.rar>
OR
http://www.wupload.com/file/82665325/rptrs211.rar

--=20
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.
To post to this group, send an email to aruntrusa@googlegroups.com.
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.
For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.


--=20
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.
To post to this group, send an email to aruntrusa@googlegroups.com.
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.
For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.


--=_reb-r672A1775-t4E3F1014
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html; charset=windows-1252

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> <html>Remove=
!!!!!<p>Sent on the Now Network=99 from my Sprint=AE BlackBerry</p><hr><div=
><b>From: </b> Nehir Deniz &lt;nehircem9@gmail.com&gt;
</div><div><b>Sender: </b> aruntrusa@googlegroups.com
</div><div><b>Date: </b>Sun, 7 Aug 2011 21:35:22 +0300</div><div><b>ReplyTo=
: </b> nehircem9@gmail.com
</div><div><b>Subject: </b>Arun Chandupatla Repeaters 2011 DVDRip XviD-play=
XD</div><div><br></div><head>  </head><div class=3D"postrow has_after_conte=
nt">
			=09
			=09
				<h2 class=3D"title icon">
					Repeaters 2011 DVDRip XviD-playXD
				</h2>
			=09


					=09
						=09
							<div id=3D"ad_thread_first_post_content">
<ins style=3D"display:inline-table;border:none;height:250px;margin:0;paddin=
g:0;position:relative;visibility:visible;width:250px"><ins style=3D"display=
:block;border:none;height:250px;margin:0;padding:0;position:relative;visibi=
lity:visible;width:250px" id=3D"aswift_2_anchor"></ins></ins></div>

					=09
					=09
						=09
					=09
				<div class=3D"content hasad">
					<div id=3D"post_message_268">
						<blockquote class=3D"postcontent restore ">
							<b> <a target=3D"_blank" href=3D"http://www.rlslog.net/repeaters-201=
1-dvdrip-xvid-playxd/"><br>
</a> </b><br>
<br>
 <br>
 <br>
  <img border=3D"0" alt=3D"" src=3D"http://nsa28.casimages.com/img/2011/08/=
07//11080701215848381.jpg">Here is interesting scifi thriller =93Repeaters=
=94 released by p2p group playXD.<br>
 <b>Plot:</b> REPEATERS is an aggressive, fast-paced with an  important=20
moral question: what would you do if you knew that everyday  you started
 over with a clean slate? Sonia, Kyle and Weeks are three  cynical=20
outsiders fed up with the peer groups and the perceived  injustices=20
inflicted upon their early adult lives. Forced into mandatory  rehab,=20
the trio is given a day pass to attempt to complete step nine on  the=20
path to recovery =96 make direct amends with those they have wronged  in=20
the past. Upon acceptance of their predicament, the three begin to =20
behave with more confidence and bravado because surely their misdeeds =20
will be erased if the day continues to repeat itself. Accordingly, they=20
 set out pulling pranks and committing petty revenges, but things soon =20
escalate, culminating in the torture and kidnapping of a rival.<br>
<table width=3D"500" class=3D"ncode_imageresizer_warning" id=3D"ncode_image=
resizer_warning_1"><tbody><tr><td width=3D"20" class=3D"td1"><img width=3D"=
16" height=3D"16" border=3D"0" src=3D"http://www.nehirce.com/forum//images/=
misc/nCode.png" alt=3D""></td>
<td class=3D"td2">Click this bar to view the original image of 520x329px.</=
td></tr></tbody></table><img width=3D"500" height=3D"316" border=3D"0" alt=
=3D"" src=3D"http://nsa28.casimages.com/img/2011/08/07//110807012217491055.=
png" id=3D"ncode_imageresizer_container_1"><br>

 <b>Genre:</b> Drama | Sci-Fi | Thriller<br>
<b>IMDB rating:</b> 6/10 (32 votes)<br>
<b>Directed by:</b> Carl Bessai<br>
<b>Starring:</b> Dustin Milligan, Amanda Crew, Richard de Klerk, Benjamin R=
atner<br>
 <b>Release Name</b>: Repeaters.2011.DVDRip.XviD-playXD<br>
<b>Size</b>: 705.44 MB<br>
<b>Quality</b>: 640=D7272, 968 Kbps, MP3 Audio<br>
<b>Runtime</b>: 89 min<br>
<b>Filename</b>: Repeaters.2011.DVDRip.XviD-playXD<br>
<br>
<br>
<br>
<br>
<a target=3D"_blank" href=3D"http://www.wupload.com/file/82665326/Repeaters=
.2011.DVDRip.XviD-playXD.avi">http://www.wupload.com/file/82665326...viD-pl=
ayXD.avi</a><br>
OR<br>
<a target=3D"_blank" href=3D"http://www.wupload.com/file/82665327/Repeaters=
.2011.DVDRip.XviD-playXD.avi">http://www.wupload.com/file/82665327...viD-pl=
ayXD.avi</a><br>
OR<br>
<a target=3D"_blank" href=3D"http://www.wupload.com/file/82665329/Repeaters=
.2011.DVDRip.XviD-playXD.avi">http://www.wupload.com/file/82665329...viD-pl=
ayXD.avi</a><br>
<br>
OR<br>
<br>
<a target=3D"_blank" href=3D"http://www.wupload.com/file/82665328/Repeaters=
.2011.DVDRip.XviD-playXD.rar">http://www.wupload.com/file/82665328...viD-pl=
ayXD.rar</a><br>
OR<br>
<a target=3D"_blank" href=3D"http://www.wupload.com/file/82665325/rptrs211.=
rar">http://www.wupload.com/file/82665325/rptrs211.rar</a>
						</blockquote>
					</div>

				=09
				</div>
			</div>

<p></p>

-- <br>
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.<br>
To post to this group, send an email to aruntrusa@googlegroups.com.<br>
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.<br>

For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.<br>



</html>

<p></p>

-- <br>
You received this message because you are subscribed to the Google Groups "=
ArunTR.USA" group.<br>
To post to this group, send an email to aruntrusa@googlegroups.com.<br>
To unsubscribe from this group, send email to aruntrusa+unsubscribe@googleg=
roups.com.<br>

For more options, visit this group at http://groups.google.com/group/aruntr=
usa?hl=3Den-GB.<br>



--=_reb-r672A1775-t4E3F1014--


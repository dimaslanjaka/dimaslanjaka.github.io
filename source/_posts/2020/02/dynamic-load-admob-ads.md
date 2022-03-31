---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
date: 2020-02-14T22:49:00.000+07:00
lang: en
location: ""
modified: 2020-03-02T09:09:33.926+07:00
subtitle: pre><br />lt;LinearLayout<br
  />x9;android:id=quot;@id/main_adTopBannerquot;<br
  />x9;android:orientation=quot;verticalquot; <br
tags:
  - Android
title: Dynamic load admob ads
type: post
uuid: 656c7dc4-0305-4888-8ff0-826438d3697b
webtitle: WMI Gitlab
updated: 2020-03-02T09:09:33+07:00
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
photos:
  - https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png
description: pre><br />lt;LinearLayout<br
  />x9;android:id=quot;@id/main_adTopBannerquot;<br
  />x9;android:orientation=quot;verticalquot; <br
excerpt: pre><br />lt;LinearLayout<br
  />x9;android:id=quot;@id/main_adTopBannerquot;<br
  />x9;android:orientation=quot;verticalquot; <br
wordcount: 63
---

<pre><br>&lt;LinearLayout<br>	android:id="@+id/main_adTopBanner"<br>	android:orientation="vertical" <br>	android:layout_height="50dp"<br>	android:layout_width="match_parent"&gt;        <br>&lt;/LinearLayout&gt;<br><br><br>@Override<br>protected void onCreate(Bundle savedInstanceState)<br>{<br>	super.onCreate(savedInstanceState);<br>	setContentView(R.layout.activity_main);<br><br>	LoadAds();			    	   <br>}<br>	<br>private AdView AD_TOP_BANNER = null;<br>public void LoadAds()<br>{<br>	// Create the adView.<br>	this.AD_TOP_BANNER = new AdView(this);<br>	this.AD_TOP_BANNER.setAdUnitId("MY_SPECIAL AND_UNIQUE_AD_ID");<br>	// this.AD_TOP_BANNER.setAdSize(AdSize.BANNER);<br>	this.AD_TOP_BANNER.setAdSize(AdSize.SMART_BANNER);<br><br>	// Lookup your LinearLayout assuming it's been given	<br>	LinearLayout layout = (LinearLayout) findViewById(R.id.main_adTopBanner);<br><br>	// Add the adView to it.<br>	layout.addView(this.AD_TOP_BANNER);<br><br>	// Initiate a generic request.<br>	AdRequest adRequest = null;<br>	adRequest = new AdRequest.Builder().build();<br>	//FOR TESTING AND LOADING TEST ADS<br>	//adRequest = new AdRequest.Builder().addTestDevice(AdRequest.DEVICE_ID_EMULATOR).addTestDevice("AC98C820A50B4AD8A2106EDE96FB87D4").build();	<br><br>	// Load the adView with the ad request.<br>	this.AD_TOP_BANNER.loadAd(adRequest);<br>}<br></pre>
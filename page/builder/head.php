<?php
if (!isset($head)) {
  exit('please include constant $head');
}
?>
<!DOCTYPE html>
<html class='v2' dir='ltr' xmlns='https://www.w3.org/1999/xhtml' xmlns:b='https://www.google.com/2005/gml/b' xmlns:data='https://www.google.com/2005/gml/data' xmlns:expr='https://www.google.com/2005/gml/expr' lang="en">

<head>
  <PageMap>
    <DataObject type="website"></DataObject>
  </PageMap>
  <base href="<?= $head['base'] ?>">
  <!--
    Recoded by: Dimas Lanjaka Alias: L3n4r0x
    Website: https://web-manajemen.blogspot.com WMI
    JSCompress: https://jscompress.com/ Compress javascript
    CSSCompress: https://csscompressor.com/ Compress CSS
  -->
  <!--[Caching]-->
  <include expiration='7d' path='*.css'></include>
  <include expiration='7d' path='*.js'></include>
  <include expiration='3d' path='*.gif'></include>
  <include expiration='3d' path='*.jpeg'></include>
  <include expiration='3d' path='*.jpg'></include>
  <include expiration='3d' path='*.png'></include>
  <!-- [ Prefetch DNS for external assets ]-->
  <link crossorigin='' href='https://static.xx.fbcdn.net' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://cdnjs.cloudflare.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.blogger.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://fonts.gstatic.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://fonts.googleapis.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://resources.blogblog.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.google-analytics.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.gstatic.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.googletagservices.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://raw.githack.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://cdn.jsdelivr.net' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://tpc.googlesyndication.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.googletagmanager.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://1.bp.blogspot.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://2.bp.blogspot.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://3.bp.blogspot.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://4.bp.blogspot.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://cdn.statically.io' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://pagead2.googlesyndication.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://googleads.g.doubleclick.net' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://adservice.google.co.id/' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://adservice.google.com/' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://www.youtube.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://lh3.googleusercontent.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://img.youtube.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://raw.githubusercontent.com' rel='preconnect dns-prefetch' />
  <link crossorigin='' href='https://i.ytimg.com' rel='preconnect dns-prefetch' />
  <!--[Meta Content-Type AND Charset]-->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="theme-color" content="#33b5e5">
  <title><?= $head['title'] ?> - <?= $head['site'] ?></title>
  <link rel="shortcut icon" href="<?= $head['favicon'] ?>" />
  <meta name="description" content="<?= $head['desc'] ?>" />
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="<?= $head['canonical'] ?>" />
  <meta property="og:type" content="website" />
  <meta content='182383652179465' property='fb:app_id' />
  <meta content='100001995776790' property='fb:admins' />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="<?= $head['title'] ?>" />
  <meta property="og:description" content="<?= $head['desc'] ?>" />
  <meta property="og:url" content="<?= $head['canonical'] ?>" />
  <meta property="og:site_name" content="<?= $head['title'] ?>" />
  <meta property="og:image" content="<?= $head['image'] ?>" />
  <meta property="og:image:secure_url" content="<?= $head['image'] ?>" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:description" content="<?= $head['desc'] ?>" />
  <meta name="twitter:title" content="<?= $head['title'] ?>" />
  <meta name="twitter:site" content="@WManajemen" />
  <meta name="twitter:image" content="<?= $head['image'] ?>" />
  <meta name="google-site-verification" content="" />
  <link rel='dns-prefetch' href='//dimaslanjaka.github.io' />
  <link rel='dns-prefetch' href='//dimaslanjaka.github.io' />
  <link rel='dns-prefetch' href='//s.w.org' />
  <meta name="generator" content="blogger" />
  <meta name="generator" content="WordPress 5.3.2" />
  <meta name="generator" content="WooCommerce 3.8.1" />
  <meta name="referrer" content="always" />
  <link rel="icon" href="<?= $head['image'] ?>" sizes="32x32" />
  <link rel="icon" href="<?= $head['image'] ?>" sizes="192x192" />
  <link rel="apple-touch-icon-precomposed" href="<?= $head['image'] ?>" sizes="180x180" />
  <meta name="msapplication-TileImage" content="<?= $head['image'] ?>" />
  <meta name="p:domain_verify" content="ba4bb1f26dcf05eadc4ea92722eca381" />
  <link rel='stylesheet' href='css/compiled.block.css' type='text/css' media='all' />
  <link rel='stylesheet' href='css/compiled.min.css' type='text/css' media='all' />
  <script type='text/javascript'>
    /* <![CDATA[ */
    var mdw_search_object = {
      "search_tree": {
        "290": {
          "title": "bootstrap panels - examples & tutorial. basic & advanced usage",
          "description": "bootstrap panels are bordered boxes where you can place texts, lists, tables and other content. panels are similar to cards, but they don't include media.",
          "link": "https:\/\/mdbootstrap.com?page_id=290",
          "wptitle": "Panels"
        },
        "102429": {
          "title": "material design for bootstrap installation guide",
          "description": "download zip package to get the compiled css and javascript, source code or install mdbootstrap using npm. you can also use cdn for quick start.",
          "link": "https:\/\/mdbootstrap.com?page_id=102429",
          "wptitle": "Installation Guide"
        }
      }
    };
    /* ]]> */
  </script>
  <script src='js/compiled.core.js'></script>
  <script src='js/compiled.search.js'></script>
  <script type='application/ld+json'>
    {
      "@context": "http://schema.org",
      "@type": "Website",
      "name": "<?= $head['title'] ?> - <?= $head['site'] ?>",
      "url": "<?= $head['canonical'] ?>",
      "sameAs": [
        "https://www.facebook.com/dimaslanjaka1",
        "https://twitter.com/WManajemen",
        "https://codepen.io/dimaslanjaka/",
        "https://github.com/dimaslanjaka/Web-Manajemen"
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "<?= $head['search'] ?>?q={q}",
        "query-input": "required name=q"
      },
      "description": "<?= $head['desc'] ?>"
    }
  </script>
  <script type='application/ld+json'>
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "<?= $head['canonical'] ?>"
      },
      "headline": "<?= $head['title'] ?>",
      "description": "<?= $head['desc'] ?>",
      "datePublished": "<?= $head['published'] ?>",
      "dateModified": "<?= $head['updated'] ?>",
      "image": {
        "@type": "ImageObject",
        "url": "<?= $head['image'] ?>",
        "height": 720,
        "width": 1280
      },
      "publisher": {
        "@type": "Organization",
        "name": "Website Management Indonesia",
        "logo": {
          "@type": "ImageObject",
          "url": "<?= $head['logo'] ?>",
          "width": 600,
          "height": 60
        }
      },
      "author": {
        "@type": "Person",
        "name": "Dimas Lanjaka",
        "url": "https://github.com/dimaslanjaka"
      }
    }
  </script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        <?php
        $i = 0;
        foreach ($head['breadcrumb'] as $bread) {
          $i++;
          if (!empty($bread['url']) && !empty($bread['name'])) {
        ?> {
              "@type": "ListItem",
              "position": <?= $i; ?>,
              "item": {
                "@id": "<?= $bread['url']; ?>",
                "name": "<?= $bread['name']; ?>"
              }
            },
          <?php
          }
          if (($i == count($head['breadcrumb']))) {
            $i++;
          ?> {
              "@type": "ListItem",
              "position": <?= $i ?>,
              "item": {
                "@id": "<?= $head['canonical'] ?>",
                "name": "<?= $head['title'] ?>"
              }
            }
        <?php
          }
        }
        ?>
      ]
    }
  </script>
  <!-- Ahref verification -->
  <meta name="ahrefs-site-verification" content="">
  <style>
    #mlbb .card {
      min-height: 500px;
    }

    div.ads {
      margin: 3px;
      padding: 2px;
    }

    .fb-comments,
    .fb-comments iframe[style],
    .fb-like-box,
    .fb-like-box iframe[style] {
      width: 100% !important;
    }

    .fb-comments span,
    .fb-comments iframe span[style],
    .fb-like-box span,
    .fb-like-box iframe span[style] {
      width: 100% !important;
    }
  </style>
</head>
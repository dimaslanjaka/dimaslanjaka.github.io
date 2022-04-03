<?php
/*
	Plugin Name: GN Sitemap Generator
	Plugin URI: http://www.google.com/profiles/109139237014771009015?hl=en
	Description: Automatically generates a news sitemap used by Google News. If you didn't yet, suggest your site for inclusion in Google News then use this plugin to create the news sitemap. <strong>You must go to <a href="options-general.php?page=main.php">Settings -> Google News Sitemap</a> for initial setup!</strong> If you have a feature request or issue with the plugin, please post in the Google News Help Forum. Partialy based on <a href="http://www.andreapernici.com/wordpress/google-news-sitemap/">Andrea Pernici's</a> Google News Sitemap plugin
	Version: 0.02
	Author: Gary Illyes (methode)
	Author URI: http://www.google.com/profiles/109139237014771009015?hl=en
	
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

	*/
	$gns_sitemap_version = "0.02";


	add_option('gns_active', true);
	add_option('gns_ping_off',true);
	add_option('gns_kw', true);
	add_option('gns_last_ping', 0);
	add_option('gns_n_name','Publication Name');
	add_option('gns_n_lang','en');
	add_option('gns_n_genres_type','NA');
	add_option('gns_n_access_type','NA');
	
	add_action('delete_post', gns_autobuild ,9999,1);	
	add_action('publish_post', gns_autobuild ,9999,1);
	add_action('publish_post', 'gns_save_postdata');
	add_action('save_post', 'gns_save_postdata');
	
	$gns_active = get_option('gns_active');
	$gns_n_name = get_option('gns_n_name');
	$gns_n_lang = get_option('gns_n_lang');
	$gns_n_access = get_option('gns_n_access');
	$gns_n_genres = get_option('gns_n_genres');
	
	add_action('admin_menu', 'gns_add_pages');
	add_action('admin_menu', 'gns_meta_box_add');

	function gns_add_pages() {
		add_options_page("Google News Sitemap", "Google News Sitemap", 8, basename(__FILE__), "gns_admin_page");
	}
	function gns_save_postdata( $post_id ) {
  		if ( !wp_verify_nonce( $_POST['gns_noncename'], plugin_basename(__FILE__) )) {
    		return $post_id;
  		}
		if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) 
		return $post_id; 
	
		if ( 'page' == $_POST['post_type'] ) {
			if ( !current_user_can( 'edit_page', $post_id ) )
				return $post_id;
		} else {
			if ( !current_user_can( 'edit_post', $post_id ) )
				return $post_id;
		}

  	$gns_notnews		= $_POST['gns_notnews'];
	$gns_n_lang			= $_POST['gns_n_lang'];
	$gns_n_genres_type	= $_POST['gns_n_genres_type'];
	$gns_n_access_type	= $_POST['gns_n_access_type'];
  	$gns_kywrds			= $_POST['gns_kywrds'];
	$gns_stock			= $_POST['gns_stock'];
	
  	delete_post_meta($post_id, '_gns_notnews');
	delete_post_meta($post_id, '_gns_lang');
	delete_post_meta($post_id, '_gns_genre');
	delete_post_meta($post_id, '_gns_access');
  	delete_post_meta($post_id, '_gns_keywords');
	delete_post_meta($post_id, '_gns_stock');
	
	add_post_meta($post_id, '_gns_notnews', $gns_notnews);
	add_post_meta($post_id, '_gns_lang', $gns_n_lang);
	add_post_meta($post_id, '_gns_genre', $gns_n_genres_type);
	add_post_meta($post_id, '_gns_access', $gns_n_access_type);
	add_post_meta($post_id, '_gns_keywords', $gns_kywrds);
	add_post_meta($post_id, '_gns_stock', $gns_stock);
}
	function gns_meta() {
		global $post;
	
		$post_id = $post;
		if (is_object($post_id)){
			$post_id = $post_id->ID;
		}

		$gns_notnews = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_notnews', true)));

		$gns_kywrds = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_keywords', true)));
		$gns_stock  = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_stock', true)));
		
		$gns_n_lang = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_lang', true)));
		$gns_n_genres_type = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_genre', true)));
		$gns_n_access_type = htmlspecialchars(stripcslashes(get_post_meta($post_id, '_gns_access', true)));
		
		if ($gns_n_lang == ''){
			$gns_n_lang = get_option('gns_n_lang');}
		if ($gns_n_genres_type == ''){
			$gns_n_genres_type = get_option('gns_n_genres_type');}
		if ($gns_n_access_type == ''){
			$gns_n_access_type = get_option('gns_n_access_type');}
			
		if(is_array($gns_kywrds)){
			$gns_kw = '';
			foreach($gns_kywrds as $kw){
				$gns_kw .= $kw.',';
			}
			substr_replace($gns_kw ,"",-1);
			$gns_kywrds = $gns_kw;
		}
		if(is_array($gns_stock)){
			$gns_st = '';
			foreach($gns_stock as $st){
				$gns_st .= $st.',';
			}
			substr_replace($gns_st ,"",-1);
			$gns_stock = $gns_st;
		}
	
		if($post->post_type!='page'){ 
			echo '<input type="hidden" name="gns_noncename" id="gns_noncename" value="' . 
    wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
		?>

			<input value="gns_rltd" type="hidden" name="gns_rltd" />
			
			<table style="margin-bottom:40px">
			<tr>
			<th style="text-align:left;" colspan="2">
			</th>
			</tr>
            <tr>
			<th scope="row" style="text-align:right; vertical-align:top;"><?php _e('Non-News Item?', 'gn_sg')?></th>
			<td>
			<input type="checkbox" name="gns_notnews" <?php if ($gns_notnews) echo "checked=\"checked\""; ?> value="true" />
			</td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;">&nbsp;</th>
            <td>&nbsp;</td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;"><?php _e('Article Language:', 'gn_sg') ?></th>
            <td><select name="gns_n_lang" style="width:230px;">
                        	<option <?php echo $gns_n_lang=='aa'?'selected="selected"':''; ?>  value="aa">Afar</option>
                            <option <?php echo $gns_n_lang=='ab'?'selected="selected"':''; ?>  value="ab">Abkhazian</option>
                            <option <?php echo $gns_n_lang=='ae'?'selected="selected"':''; ?>  value="ae">Avestan</option>
                            <option <?php echo $gns_n_lang=='af'?'selected="selected"':''; ?>  value="af">Afrikaans</option>
                            <option <?php echo $gns_n_lang=='ak'?'selected="selected"':''; ?>  value="ak">Akan</option>
                            <option <?php echo $gns_n_lang=='am'?'selected="selected"':''; ?>  value="am">Amharic</option>
                            <option <?php echo $gns_n_lang=='an'?'selected="selected"':''; ?>  value="an">Aragonese</option>
                            <option <?php echo $gns_n_lang=='ar'?'selected="selected"':''; ?>  value="ar">Arabic</option>
                            <option <?php echo $gns_n_lang=='as'?'selected="selected"':''; ?>  value="as">Assamese</option>
                            <option <?php echo $gns_n_lang=='av'?'selected="selected"':''; ?>  value="av">Avaric</option>
                            <option <?php echo $gns_n_lang=='ay'?'selected="selected"':''; ?>  value="ay">Aymara</option>
                            <option <?php echo $gns_n_lang=='az'?'selected="selected"':''; ?>  value="az">Azerbaijani</option>
                            <option <?php echo $gns_n_lang=='ba'?'selected="selected"':''; ?>  value="ba">Bashkir</option>
                            <option <?php echo $gns_n_lang=='be'?'selected="selected"':''; ?>  value="be">Belarusian</option>
                            <option <?php echo $gns_n_lang=='bg'?'selected="selected"':''; ?>  value="bg">Bulgarian</option>
                            <option <?php echo $gns_n_lang=='bh'?'selected="selected"':''; ?>  value="bh">Bihari</option>
                            <option <?php echo $gns_n_lang=='bi'?'selected="selected"':''; ?>  value="bi">Bislama</option>
                            <option <?php echo $gns_n_lang=='bm'?'selected="selected"':''; ?>  value="bm">Bambara</option>
                            <option <?php echo $gns_n_lang=='bn'?'selected="selected"':''; ?>  value="bn">Bengali</option>
                            <option <?php echo $gns_n_lang=='bo'?'selected="selected"':''; ?>  value="bo">Tibetan</option>
                            <option <?php echo $gns_n_lang=='br'?'selected="selected"':''; ?>  value="br">Breton</option>
                            <option <?php echo $gns_n_lang=='bs'?'selected="selected"':''; ?>  value="bs">Bosnian</option>
                            <option <?php echo $gns_n_lang=='ca'?'selected="selected"':''; ?>  value="ca">Catalan, Valencian</option>
                            <option <?php echo $gns_n_lang=='ce'?'selected="selected"':''; ?>  value="ce">Chechen</option>
                            <option <?php echo $gns_n_lang=='ch'?'selected="selected"':''; ?>  value="ch">Chamorro</option>
                            <option <?php echo $gns_n_lang=='co'?'selected="selected"':''; ?>  value="co">Corsican</option>
                            <option <?php echo $gns_n_lang=='cr'?'selected="selected"':''; ?>  value="cr">Cree</option>
                            <option <?php echo $gns_n_lang=='cs'?'selected="selected"':''; ?>  value="cs">Czech</option>
                            <option <?php echo $gns_n_lang=='cu'?'selected="selected"':''; ?>  value="cu">Church Slavic</option>
                            <option <?php echo $gns_n_lang=='cv'?'selected="selected"':''; ?>  value="cv">Chuvash</option>
                            <option <?php echo $gns_n_lang=='cy'?'selected="selected"':''; ?>  value="cy">Welsh</option>
                            <option <?php echo $gns_n_lang=='da'?'selected="selected"':''; ?>  value="da">Danish</option>
                            <option <?php echo $gns_n_lang=='de'?'selected="selected"':''; ?>  value="de">German</option>
                            <option <?php echo $gns_n_lang=='dv'?'selected="selected"':''; ?>  value="dv">Divehi, Dhivehi, Maldivian</option>
                            <option <?php echo $gns_n_lang=='dz'?'selected="selected"':''; ?>  value="dz">Dzongkha</option>
                            <option <?php echo $gns_n_lang=='ee'?'selected="selected"':''; ?>  value="ee">Ewe</option>
                            <option <?php echo $gns_n_lang=='el'?'selected="selected"':''; ?>  value="el">Greek</option>
                            <option <?php echo $gns_n_lang=='en'?'selected="selected"':''; ?>  value="en">English</option>
                            <option <?php echo $gns_n_lang=='es'?'selected="selected"':''; ?>  value="es">Spanish</option>
                            <option <?php echo $gns_n_lang=='et'?'selected="selected"':''; ?>  value="et">Estonian</option>
                            <option <?php echo $gns_n_lang=='eu'?'selected="selected"':''; ?>  value="eu">Basque</option>
                            <option <?php echo $gns_n_lang=='fa'?'selected="selected"':''; ?>  value="fa">Persian</option>
                            <option <?php echo $gns_n_lang=='ff'?'selected="selected"':''; ?>  value="ff">Fulah</option>
                            <option <?php echo $gns_n_lang=='fi'?'selected="selected"':''; ?>  value="fi">Finnish</option>
                            <option <?php echo $gns_n_lang=='fj'?'selected="selected"':''; ?>  value="fj">Fijian</option>
                            <option <?php echo $gns_n_lang=='fo'?'selected="selected"':''; ?>  value="fo">Faroese</option>
                            <option <?php echo $gns_n_lang=='fr'?'selected="selected"':''; ?>  value="fr">French</option>
                            <option <?php echo $gns_n_lang=='fy'?'selected="selected"':''; ?>  value="fy">Western Frisian</option>
                            <option <?php echo $gns_n_lang=='ga'?'selected="selected"':''; ?>  value="ga">Irish</option>
                            <option <?php echo $gns_n_lang=='gl'?'selected="selected"':''; ?>  value="gl">Galician</option>
                            <option <?php echo $gns_n_lang=='gn'?'selected="selected"':''; ?>  value="gn">Guaraní</option>
                            <option <?php echo $gns_n_lang=='gu'?'selected="selected"':''; ?>  value="gu">Gujarati</option>
                            <option <?php echo $gns_n_lang=='gv'?'selected="selected"':''; ?>  value="gv">Manx</option>
                            <option <?php echo $gns_n_lang=='ha'?'selected="selected"':''; ?>  value="ha">Hausa</option>
                            <option <?php echo $gns_n_lang=='he'?'selected="selected"':''; ?>  value="he">Hebrew</option>
                            <option <?php echo $gns_n_lang=='hi'?'selected="selected"':''; ?>  value="hi">Hindi</option>
                            <option <?php echo $gns_n_lang=='ho'?'selected="selected"':''; ?>  value="ho">Hiri Motu</option>
                            <option <?php echo $gns_n_lang=='hr'?'selected="selected"':''; ?>  value="hr">Croatian</option>
                            <option <?php echo $gns_n_lang=='ht'?'selected="selected"':''; ?>  value="ht">Haitian, Haitian Creole</option>
                            <option <?php echo $gns_n_lang=='hu'?'selected="selected"':''; ?>  value="hu">Hungarian</option>
                            <option <?php echo $gns_n_lang=='hy'?'selected="selected"':''; ?>  value="hy">Armenian</option>
                            <option <?php echo $gns_n_lang=='hz'?'selected="selected"':''; ?>  value="hz">Herero</option>
                            <option <?php echo $gns_n_lang=='id'?'selected="selected"':''; ?>  value="id">Indonesian</option>
                            <option <?php echo $gns_n_lang=='ig'?'selected="selected"':''; ?>  value="ig">Igbo</option>
                            <option <?php echo $gns_n_lang=='ii'?'selected="selected"':''; ?>  value="ii">Sichuan Yi, Nuosu</option>
                            <option <?php echo $gns_n_lang=='ik'?'selected="selected"':''; ?>  value="ik">Inupiaq</option>
                            <option <?php echo $gns_n_lang=='io'?'selected="selected"':''; ?>  value="io">Ido</option>
                            <option <?php echo $gns_n_lang=='is'?'selected="selected"':''; ?>  value="is">Icelandic</option>
                            <option <?php echo $gns_n_lang=='it'?'selected="selected"':''; ?>  value="it">Italian</option>
                            <option <?php echo $gns_n_lang=='iu'?'selected="selected"':''; ?>  value="iu">Inuktitut</option>
                            <option <?php echo $gns_n_lang=='ja'?'selected="selected"':''; ?>  value="ja">Japanese</option>
                            <option <?php echo $gns_n_lang=='jv'?'selected="selected"':''; ?>  value="jv">Javanese</option>
                            <option <?php echo $gns_n_lang=='ka'?'selected="selected"':''; ?>  value="ka">Georgian</option>
                            <option <?php echo $gns_n_lang=='kg'?'selected="selected"':''; ?>  value="kg">Kongo</option>
                            <option <?php echo $gns_n_lang=='ki'?'selected="selected"':''; ?>  value="ki">Kikuyu, Gikuyu</option>
                            <option <?php echo $gns_n_lang=='kj'?'selected="selected"':''; ?>  value="kj">Kwanyama, Kuanyama</option>
                            <option <?php echo $gns_n_lang=='kk'?'selected="selected"':''; ?>  value="kk">Kazakh</option>
                            <option <?php echo $gns_n_lang=='kl'?'selected="selected"':''; ?>  value="kl">Kalaallisut, Greenlandic</option>
                            <option <?php echo $gns_n_lang=='km'?'selected="selected"':''; ?>  value="km ">Khmer</option>
                            <option <?php echo $gns_n_lang=='kn'?'selected="selected"':''; ?>  value="kn">Kannada</option>
                            <option <?php echo $gns_n_lang=='ko'?'selected="selected"':''; ?>  value="ko">Korean</option>
                            <option <?php echo $gns_n_lang=='kr'?'selected="selected"':''; ?>  value="kr">Kanuri</option>
                            <option <?php echo $gns_n_lang=='ks'?'selected="selected"':''; ?>  value="ks">Kashmiri</option>
                            <option <?php echo $gns_n_lang=='ku'?'selected="selected"':''; ?>  value="ku">Kurdish</option>
                            <option <?php echo $gns_n_lang=='kv'?'selected="selected"':''; ?>  value="kv">Komi</option>
                            <option <?php echo $gns_n_lang=='kw'?'selected="selected"':''; ?>  value="kw">Cornish</option>
                            <option <?php echo $gns_n_lang=='ky'?'selected="selected"':''; ?>  value="ky">Kirghiz, Kyrgyz</option>
                            <option <?php echo $gns_n_lang=='lb'?'selected="selected"':''; ?>  value="lb">Luxembourgish, Letzeburgesch</option>
                            <option <?php echo $gns_n_lang=='lg'?'selected="selected"':''; ?>  value="lg">Ganda</option>
                            <option <?php echo $gns_n_lang=='li'?'selected="selected"':''; ?>  value="li">Limburgish, Limburgan, Limburger</option>
                            <option <?php echo $gns_n_lang=='ln'?'selected="selected"':''; ?>  value="ln">Lingala</option>
                            <option <?php echo $gns_n_lang=='lo'?'selected="selected"':''; ?>  value="lo">Lao</option>
                            <option <?php echo $gns_n_lang=='lt'?'selected="selected"':''; ?>  value="lt">Lithuanian</option>
                            <option <?php echo $gns_n_lang=='lu'?'selected="selected"':''; ?>  value="lu">Luba-Katanga</option>
                            <option <?php echo $gns_n_lang=='lv'?'selected="selected"':''; ?>  value="lv">Latvian</option>
                            <option <?php echo $gns_n_lang=='mg'?'selected="selected"':''; ?>  value="mg">Malagasy</option>
                            <option <?php echo $gns_n_lang=='mh'?'selected="selected"':''; ?>  value="mh">Marshallese</option>
                            <option <?php echo $gns_n_lang=='mi'?'selected="selected"':''; ?>  value="mi">Maori</option>
                            <option <?php echo $gns_n_lang=='mk'?'selected="selected"':''; ?>  value="mk">Macedonian</option>
                            <option <?php echo $gns_n_lang=='ml'?'selected="selected"':''; ?>  value="ml">Malayalam</option>
                            <option <?php echo $gns_n_lang=='mn'?'selected="selected"':''; ?>  value="mn">Mongolian</option>
                            <option <?php echo $gns_n_lang=='mr'?'selected="selected"':''; ?>  value="mr">Marathi</option>
                            <option <?php echo $gns_n_lang=='ms'?'selected="selected"':''; ?>  value="ms">Malay</option>
                            <option <?php echo $gns_n_lang=='mt'?'selected="selected"':''; ?>  value="mt">Maltese</option>
                            <option <?php echo $gns_n_lang=='my'?'selected="selected"':''; ?>  value="my">Burmese</option>
                            <option <?php echo $gns_n_lang=='na'?'selected="selected"':''; ?>  value="na">Nauru</option>
                            <option <?php echo $gns_n_lang=='nb'?'selected="selected"':''; ?>  value="nb">Norwegian Bokmal</option>
                            <option <?php echo $gns_n_lang=='nd'?'selected="selected"':''; ?>  value="nd">North Ndebele</option>
                            <option <?php echo $gns_n_lang=='ne'?'selected="selected"':''; ?>  value="ne">Nepali</option>
                            <option <?php echo $gns_n_lang=='ng'?'selected="selected"':''; ?>  value="ng">Ndonga</option>
                            <option <?php echo $gns_n_lang=='nl'?'selected="selected"':''; ?>  value="nl">Dutch, Flemish</option>
                            <option <?php echo $gns_n_lang=='nn'?'selected="selected"':''; ?>  value="nn">Norwegian Nynorsk</option>
                            <option <?php echo $gns_n_lang=='no'?'selected="selected"':''; ?>  value="no">Norwegian</option>
                            <option <?php echo $gns_n_lang=='nr'?'selected="selected"':''; ?>  value="nr">South Ndebele</option>
                            <option <?php echo $gns_n_lang=='nv'?'selected="selected"':''; ?>  value="nv">Navajo, Navaho</option>
                            <option <?php echo $gns_n_lang=='ny'?'selected="selected"':''; ?>  value="ny">Chichewa, Chewa, Nyanja</option>
                            <option <?php echo $gns_n_lang=='oj'?'selected="selected"':''; ?>  value="oj">Ojibwa</option>
                            <option <?php echo $gns_n_lang=='om'?'selected="selected"':''; ?>  value="om">Oromo</option>
                            <option <?php echo $gns_n_lang=='or'?'selected="selected"':''; ?>  value="or">Oriya</option>
                            <option <?php echo $gns_n_lang=='os'?'selected="selected"':''; ?>  value="os">Ossetian, Ossetic</option>
                            <option <?php echo $gns_n_lang=='pa'?'selected="selected"':''; ?>  value="pa">Panjabi, Punjabi</option>
                            <option <?php echo $gns_n_lang=='pi'?'selected="selected"':''; ?>  value="pi">Pali</option>
                            <option <?php echo $gns_n_lang=='pl'?'selected="selected"':''; ?>  value="pl">Polish</option>
                            <option <?php echo $gns_n_lang=='ps'?'selected="selected"':''; ?>  value="ps">Pashto, Pushto</option>
                            <option <?php echo $gns_n_lang=='pt'?'selected="selected"':''; ?>  value="pt">Portuguese</option>
                            <option <?php echo $gns_n_lang=='qu'?'selected="selected"':''; ?>  value="qu">Quechua</option>
                            <option <?php echo $gns_n_lang=='rm'?'selected="selected"':''; ?>  value="rm">Romansh</option>
                            <option <?php echo $gns_n_lang=='rn'?'selected="selected"':''; ?>  value="rn">Rundi</option>
                            <option <?php echo $gns_n_lang=='ro'?'selected="selected"':''; ?>  value="ro">Romanian, Moldavian, Moldovan</option>
                            <option <?php echo $gns_n_lang=='ru'?'selected="selected"':''; ?>  value="ru">Russian</option>
                            <option <?php echo $gns_n_lang=='rw'?'selected="selected"':''; ?>  value="rw">Kinyarwanda</option>
                            <option <?php echo $gns_n_lang=='sa'?'selected="selected"':''; ?>  value="sa">Sanskrit</option>
                            <option <?php echo $gns_n_lang=='sc'?'selected="selected"':''; ?>  value="sc">Sardinian</option>
                            <option <?php echo $gns_n_lang=='sd'?'selected="selected"':''; ?>  value="sd">Sindhi</option>
                            <option <?php echo $gns_n_lang=='se'?'selected="selected"':''; ?>  value="se">Northern Sami</option>
                            <option <?php echo $gns_n_lang=='sg'?'selected="selected"':''; ?>  value="sg">Sango</option>
                            <option <?php echo $gns_n_lang=='si'?'selected="selected"':''; ?>  value="si">Sinhala, Sinhalese</option>
                            <option <?php echo $gns_n_lang=='sk'?'selected="selected"':''; ?>  value="sk">Slovak</option>
                            <option <?php echo $gns_n_lang=='sl'?'selected="selected"':''; ?>  value="sl">Slovene</option>
                            <option <?php echo $gns_n_lang=='sm'?'selected="selected"':''; ?>  value="sm">Samoan</option>
                            <option <?php echo $gns_n_lang=='sn'?'selected="selected"':''; ?>  value="sn">Shona</option>
                            <option <?php echo $gns_n_lang=='so'?'selected="selected"':''; ?>  value="so">Somali</option>
                            <option <?php echo $gns_n_lang=='sq'?'selected="selected"':''; ?>  value="sq">Albanian</option>
                            <option <?php echo $gns_n_lang=='sr'?'selected="selected"':''; ?>  value="sr">Serbian</option>
                            <option <?php echo $gns_n_lang=='ss'?'selected="selected"':''; ?>  value="ss">Swati</option>
                            <option <?php echo $gns_n_lang=='st'?'selected="selected"':''; ?>  value="st">Southern Sotho</option>
                            <option <?php echo $gns_n_lang=='su'?'selected="selected"':''; ?>  value="su">Sundanese</option>
                            <option <?php echo $gns_n_lang=='sv'?'selected="selected"':''; ?>  value="sv">Swedish</option>
                            <option <?php echo $gns_n_lang=='sw'?'selected="selected"':''; ?>  value="sw">Swahili</option>
                            <option <?php echo $gns_n_lang=='ta'?'selected="selected"':''; ?>  value="ta">Tamil</option>
                            <option <?php echo $gns_n_lang=='te'?'selected="selected"':''; ?>  value="te">Telugu</option>
                            <option <?php echo $gns_n_lang=='tg'?'selected="selected"':''; ?>  value="tg">Tajik</option>
                            <option <?php echo $gns_n_lang=='th'?'selected="selected"':''; ?>  value="th">Thai</option>
                            <option <?php echo $gns_n_lang=='ti'?'selected="selected"':''; ?>  value="ti">Tigrinya</option>
                            <option <?php echo $gns_n_lang=='tk'?'selected="selected"':''; ?>  value="tk">Turkmen</option>
                            <option <?php echo $gns_n_lang=='tl'?'selected="selected"':''; ?>  value="tl">Tagalog</option>
                            <option <?php echo $gns_n_lang=='tn'?'selected="selected"':''; ?>  value="tn">Tswana</option>
                            <option <?php echo $gns_n_lang=='to'?'selected="selected"':''; ?>  value="to">Tonga (Tonga Islands)</option>
                            <option <?php echo $gns_n_lang=='tr'?'selected="selected"':''; ?>  value="tr">Turkish</option>
                            <option <?php echo $gns_n_lang=='ts'?'selected="selected"':''; ?>  value="ts">Tsonga</option>
                            <option <?php echo $gns_n_lang=='tt'?'selected="selected"':''; ?>  value="tt">Tatar</option>
                            <option <?php echo $gns_n_lang=='tw'?'selected="selected"':''; ?>  value="tw">Twi</option>
                            <option <?php echo $gns_n_lang=='ty'?'selected="selected"':''; ?>  value="ty">Tahitian</option>
                            <option <?php echo $gns_n_lang=='ug'?'selected="selected"':''; ?>  value="ug">Uighur, Uyghur</option>
                            <option <?php echo $gns_n_lang=='uk'?'selected="selected"':''; ?>  value="uk">Ukrainian</option>
                            <option <?php echo $gns_n_lang=='ur'?'selected="selected"':''; ?>  value="ur">Urdu</option>
                            <option <?php echo $gns_n_lang=='uz'?'selected="selected"':''; ?>  value="uz">Uzbek</option>
                            <option <?php echo $gns_n_lang=='ve'?'selected="selected"':''; ?>  value="ve">Venda</option>
                            <option <?php echo $gns_n_lang=='vi'?'selected="selected"':''; ?>  value="vi">Vietnamese</option>
                            <option <?php echo $gns_n_lang=='vo'?'selected="selected"':''; ?>  value="vo">Volapük</option>
                            <option <?php echo $gns_n_lang=='wa'?'selected="selected"':''; ?>  value="wa">Walloon</option>
                            <option <?php echo $gns_n_lang=='wo'?'selected="selected"':''; ?>  value="wo">Wolof</option>
                            <option <?php echo $gns_n_lang=='xh'?'selected="selected"':''; ?>  value="xh">Xhosa</option>
                            <option <?php echo $gns_n_lang=='yi'?'selected="selected"':''; ?>  value="yi">Yiddish</option>
                            <option <?php echo $gns_n_lang=='yo'?'selected="selected"':''; ?>  value="yo">Yoruba</option>
                            <option <?php echo $gns_n_lang=='za'?'selected="selected"':''; ?>  value="za">Zhuang, Chuang</option>
                            <option <?php echo $gns_n_lang=='zh-cn'?'selected="selected"':''; ?>  value="zh-cn">Chinese, Simplified</option>
                            <option <?php echo $gns_n_lang=='zh-tw'?'selected="selected"':''; ?>  value="zh-tw">Chinese, Traditional</option>
                            <option <?php echo $gns_n_lang=='zu'?'selected="selected"':''; ?>  value="zu">Zulu</option></select></td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;"><?php _e('Article Genre:', 'gn_sg') ?></th>
			<td><select name="gns_n_genres_type" style="width:230px;">
                        	<option <?php echo $gns_n_genres_type=="NA"?'selected="selected"':'';?> value="NA">Not Applicable</option>
							<option <?php echo $gns_n_genres_type=="Blog"?'selected="selected"':'';?> value="Blog">Blog</option>
							<option <?php echo $gns_n_genres_type=="PressRelease"?'selected="selected"':'';?> value="PressRelease">Press Release</option>
							<option <?php echo $gns_n_genres_type=="UserGenerated"?'selected="selected"':'';?> value="UserGenerated">UserGenerated</option>
                            <option <?php echo $gns_n_genres_type=="Satire"?'selected="selected"':'';?> value="Satire">Satire</option>
                            <option <?php echo $gns_n_genres_type=="OpEd"?'selected="selected"':'';?> value="OpEd">OpEd</option>
                            <option <?php echo $gns_n_genres_type=="Opinion"?'selected="selected"':'';?> value="Opinion">Opinion</option></select></td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;"><?php _e('Article Aceess:', 'gn_sg') ?></th>
            <td><select name="gns_n_access_type" style="width:230px;">
                    	<option <?php echo $gns_n_access_type=="NA"?'selected="selected"':'';?> value="NA">Not Applicable</option>
						<option <?php echo $gns_n_access_type=="Subscription"?'selected="selected"':'';?> value="Subscription">Subscription</option>
						<option <?php echo $gns_n_access_type=="Registration"?'selected="selected"':'';?> value="Registration">Registration</option>	</select></td>
			</tr>
            <tr>
			<th scope="row" style="text-align:right;"><?php _e('Keywords (comma separated):', 'gn_sg') ?></th>
			<td><input value="<?php echo $gns_kywrds ?>" type="text" name="gns_kywrds" size="62"/></td>
			</tr>
			<tr>
			<th scope="row" style="text-align:right;"><?php _e('Stock Tickers (comma separated):', 'gn_sg') ?></th>
			<td><input value="<?php echo $gns_stock ?>" type="text" name="gns_stock" size="62"/><br />
				<sub>i.e. "NASDAQ:AMAT" (but not "NASD:AMAT"), or "BOM:500325" (but not "BOM:RIL")</sub></td>
			</tr>
			</table>
		<?php
	}
}
	function gns_old_meta_box(){
		echo '<div class="dbx-b-ox-wrapper">' . "\n";
		echo '<fieldset id="gns_fieldset" class="dbx-box">' . "\n";
		echo '<div class="dbx-h-andle-wrapper"><h3 class="dbx-handle">' . 
		__( 'Google News Sitemap', 'google_news_sitemap' ) . "</h3></div>";   
	   
		echo '<div class="dbx-c-ontent-wrapper"><div class="dbx-content">';
		gns_meta();
		echo "</div></div></fieldset></div>\n";	
	
	}

	function gns_meta_box_add() {
		if ( function_exists('add_meta_box') ) {
			add_meta_box('gns',__('Google News Sitemap', 'google_news_sitemap'),'gns_meta','post');
		} else {
			add_action('dbx_post_advanced', 'gns_old_meta_box' );
	  }
	}
	
	function gns_permissions() {
		$gns_active = get_option('gns_active');
		$gns_path = ABSPATH;
		$gns_news_file_path = $gns_path . "google-news-sitemap.xml";
		if ($gns_active && is_file($gns_news_file_path) && is_writable($gns_news_file_path)) $gns_permission += 0;
		elseif ($gns_active && !is_file($gns_news_file_path) && is_writable($gns_path)) {
			$fp = fopen($gns_news_file_path, 'w+');
			fwrite($fp, "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:n=\"http://www.google.com/schemas/sitemap-news/0.9\" />\r\n <!-- Test sitemap -->");
			fclose($fp);
			if (is_file($gns_news_file_path) && is_writable($gns_news_file_path)) $gns_permission += 0;
			else $gns_permission += 2;
		}
		elseif ($gns_active) $gns_permission += 2;
		else $gns_permission += 0;
		return $gns_permission;
	}

	/*
		Auto Build sitemap
	*/
	function gns_autobuild($postID) {
		global $wp_version;
		$isScheduled = false;
		$lastPostID = 0;
		if($lastPostID != $postID && (!defined('WP_IMPORTING') || WP_IMPORTING != true)) {
			if(floatval($wp_version) >= 2.1) {
				if(!$isScheduled) {
					wp_clear_scheduled_hook(gns_generate_sitemap());
					wp_schedule_single_event(time()+15,gns_generate_sitemap());
					$isScheduled = true;
				}
			} else {
				if(!$lastPostID && (!isset($_GET["delete"]) || count((array) $_GET['delete'])<=0)) {
					gns_generate_sitemap();
				}
			}
			$lastPostID = $postID;
		}
	}
	
	
	function gns_generate_sitemap() {
		global $gns_sitemap_version, $wpdb;
		
		$gns_active = get_option('gns_active');
		$gns_path = get_option('gns_path');
		$gns_n_name = get_option('gns_n_name');
		$gns_n_lang = get_option('gns_n_lang');
		$gns_n_genres_type = get_option('gns_n_genres_type');
		$gns_n_access_type = get_option('gns_n_access_type');
		
		$gns_permission = gns_permissions();
		if ($gns_permission > 2 || !$gns_active) return;

		$home = get_option('home') . "/";

		$xml_sitemap_google_news = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
		$xml_sitemap_google_news .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\r\n		xmlns:n=\"http://www.google.com/schemas/sitemap-news/0.9\">\r\n";

		$posts = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE post_status='publish' AND (DATEDIFF(CURDATE(), post_date_gmt)<=2)	ORDER BY post_date_gmt DESC	LIMIT 0, 50000");
	
		foreach ($posts as $post) {
			$gns_notnews 				= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_notnews', true)));

			$gns_kywrds 				= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_keywords', true)));
			$gns_stock  				= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_stock', true)));
		
			$gns_n_lang_meta 			= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_lang', true)));
			$gns_n_genres_type_meta 	= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_genre', true)));
			$gns_n_access_type_meta 	= htmlspecialchars(stripcslashes(get_post_meta($post->ID, '_gns_access', true)));
			
			if(!empty($gns_n_lang_meta)){
				$gns_lang = $gns_n_lang_meta;
			}else{
				$gns_lang = $gns_n_lang;
			}
			if(!empty($gns_n_genres_type_meta)){
				$gns_genre = $gns_n_genres_type_meta;
			}else{
				$gns_genre = $gns_n_genres_type;
			}
			if(!empty($gns_n_access_type_meta)){
				$gns_access = $gns_n_access_type_meta;
			}else{
				$gns_access = $gns_n_access_type;
			}
			
			if ($gns_active && $gns_permission != 2) {
				$postDate = strtotime($post->post_date);
				if (time() - $postDate < 160000) {
					if($gns_notnews != 'true'){
						$xml_sitemap_google_news .= "\t<url>\r\n";
						$xml_sitemap_google_news .= "\t\t<loc>".get_permalink($post->ID)."</loc>\r\n";
						$xml_sitemap_google_news .= "\t\t<n:news>\r\n";
						$xml_sitemap_google_news .= "\t\t\t<n:publication>\r\n";
						$xml_sitemap_google_news .= "\t\t\t\t<n:name>".$gns_n_name."</n:name>\r\n";
						$xml_sitemap_google_news .= "\t\t\t\t<n:language>".$gns_lang."</n:language>\r\n";
						$xml_sitemap_google_news .= "\t\t\t</n:publication>\r\n";
						if ($gns_genre != 'NA') {
							$xml_sitemap_google_news .= "\t\t\t<n:genres>".$gns_genre."</n:genres>\r\n";
						}
						if ($gns_access != 'NA') {
							$xml_sitemap_google_news .= "\t\t\t<n:access>".$gns_access."</n:access>\r\n";
						}
						$xml_sitemap_google_news .= "\t\t\t<n:publication_date>".str_replace(" ", "T", $post->post_date_gmt)."Z</n:publication_date>\r\n";
						$xml_sitemap_google_news .= "\t\t\t<n:title>".htmlspecialchars($post->post_title)."</n:title>\r\n";
						if (!empty($gns_kywrds)) {
							$xml_sitemap_google_news .= "\t\t\t<n:keywords>".$gns_kywrds."</n:keywords>\r\n";
						}
						if (!empty($gns_stock)) {
							$xml_sitemap_google_news .= "\t\t\t<n:stock_tickers>".$gns_stock."</n:stock_tickers>\r\n";
						}
						$xml_sitemap_google_news .= "\t\t</n:news>\r\n";
						$xml_sitemap_google_news .= "\t</url>\r\n";
					}
				}
			}
			unset($gns_n_lang_meta, $gns_n_genres_type_meta, $gns_n_access_type_meta);
		}

		$xml_sitemap_google_news .= "</urlset>";
				
		if ($gns_active && $gns_permission != 2) {
			$fp = @fopen(ABSPATH . "google-news-sitemap.xml", 'w+');
			@fwrite($fp, $xml_sitemap_google_news);
			@fclose($fp);
		}
		

		$gns_last_ping = get_option('gns_last_ping');
		if(get_option('gns_ping_off') != 1){
			if ((time() - $gns_last_ping) > 60 * 60) {
				$fp = @fopen("http://www.google.com/webmasters/tools/ping?sitemap=" . urlencode($home."google-news-sitemap.xml"), 'r');
				@fclose($fp);
				update_option('gns_last_ping', time());
			}
		}
	}

	function gns_admin_page() {
		$msg = "";
		$gns_ns_loc = get_option('home').'/google-news-sitemap.xml';
		$gns_WMT = str_replace('http://'.$_SERVER['HTTP_HOST'].'/','',$gns_ns_loc);
		if ('gns_submit' == $_POST['gns_submit']) {
			update_option('gns_active', $_POST['gns_active']);
			update_option('gns_ping_off', $_POST['gns_ping_off']);
			update_option('gns_n_name', $_POST['gns_n_name']);
			update_option('gns_n_lang', $_POST['gns_n_lang']);
			update_option('gns_n_access', $_POST['gns_n_access']);
			update_option('gns_n_genres', $_POST['gns_n_genres']);
		
			if ($_POST['gns_n_genres_type']=="Blog" 
			 || $_POST['gns_n_genres_type']=="PressRelease"
		     || $_POST['gns_n_genres_type']=="UserGenerated" 
		     || $_POST['gns_n_genres_type']=="Satire" 
			 || $_POST['gns_n_genres_type']=="OpEd" 
			 || $_POST['gns_n_genres_type']=="Opinion" ) {
				update_option('gns_n_genres_type', $_POST['gns_n_genres_type']);
			} else { 
				update_option('gns_n_genres_type', "NA"); 
			}
			
			if ($_POST['gns_n_access_type']=="Subscription" 
			|| $_POST['gns_n_access_type']=="Registration" ){ 
				update_option('gns_n_access_type', $_POST['gns_n_access_type']);
			}else{ update_option('gns_n_access_type', "NA");}
			
			gns_generate_sitemap();
		}
		
		$gns_active 		= get_option('gns_active');
		$gns_ping_off 		= get_option('gns_ping_off');
		$gns_n_name 		= get_option('gns_n_name');
		$gns_n_lang 		= get_option('gns_n_lang');
		$gns_n_genres_type	= get_option('gns_n_genres_type');
		$gns_n_access_type	= get_option('gns_n_access_type');

		$gns_permission = gns_permissions();
		
		if ($gns_permission != 0) $msg = "There was an <strong>error</strong> while I tried updating or creating the <em>google-news-sitemap.xml</em>. Seems the file is not writable. Please <em>chmod</em> the file so the webserver can write to the file (i.e. 644)";
?>

<style type="text/css">
a.sm_button {
			padding:4px;
			display:block;
			padding-left:25px;
			background-repeat:no-repeat;
			background-position:5px 50%;
			text-decoration:none;
			border:none;
		}
		 
.sm-padded .inside {
	margin:12px!important;
}
.sm-padded .inside ul {
	margin:6px 0 12px 0;
}

.sm-padded .inside input {
	padding:1px;
	margin:0;
}
input, select {width:250px;}
</style> 
            

 
<div class="wrap" id="sm_div">
    <h2>Google News Sitemap Settings</h2> 
<?php	if ($msg) {	?>
	<div id="message" class="error"><p><strong><?php echo $msg; ?></strong></p></div>
<?php	}	?>

         
    </div>
    <div style="clear:both";></div> 
</div>



<div id="wpbody-content"> 

<div class="wrap" id="sm_div">

<div id="poststuff" class="metabox-holder has-right-sidebar"> 
    <div class="has-sidebar sm-padded" > 
		<div id="post-body-content" class="has-sidebar-content"> 
			<div class="meta-box-sortabless"> 
                          
				<div id="sm_rebuild" class="postbox"> 
					<h3 class="hndle"><span>Default values</span></h3>
                    <p> &nbsp;<strong>These are the default values</strong> <br />
                        &nbsp;you can edit most of these settings separately for each article below the posting area</p>
					<div class="inside"> 
		
		<form name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"]; ?><?php if(!$_GET['updated']){echo '&amp;updated=true';}?>">
			<input type="hidden" name="gns_submit" value="gns_submit" />
            <table style="margin-bottom:40px">
			<tr>
			<th style="text-align:left;" colspan="2">
			</th>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
			</tr>
            <tr>
			<th scope="row" style="text-align:right; vertical-align:top;">Plugin active <br /><em style="font-weight:normal">(checked means active)</em></th>
			<td>
			<input name="gns_active" type="checkbox" id="gns_active" value="1" <?php echo $gns_active?'checked="checked"':''; ?> />			</td>
            <td>&nbsp;</td>
			</tr>
            <th scope="row" style="text-align:right;">Ping disabled <br /><em style="font-weight:normal">(checked means disabled)</em></th>
            <td><input name="gns_ping_off" type="checkbox" id="gns_ping_off" value="1" <?php echo $gns_ping_off?'checked="checked"':''; ?> /></td>
            <td>&nbsp;</td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;">&nbsp;</th>
            <td>&nbsp;</td>
			</tr>
            <tr>
            <tr>
            <th scope="row" style="text-align:right;"><?php _e('Publication Name') ?></th>
			<td><input name="gns_n_name" type="text" id="gns_n_name" value="<?php echo $gns_n_name?>" /></td>
            <td><a href="http://gnews.briefer.net/title/finding-your-publication-name.html" target="_blank">Learn how to find it</a></td>
			</tr>
            <tr>
            <th scope="row" style="text-align:right;"><?php _e('Publication Language') ?></th>
            <td><select name="gns_n_lang">
                        	<option <?php echo $gns_n_lang=='aa'?'selected="selected"':''; ?>  value="aa">Afar</option>
                            <option <?php echo $gns_n_lang=='ab'?'selected="selected"':''; ?>  value="ab">Abkhazian</option>
                            <option <?php echo $gns_n_lang=='ae'?'selected="selected"':''; ?>  value="ae">Avestan</option>
                            <option <?php echo $gns_n_lang=='af'?'selected="selected"':''; ?>  value="af">Afrikaans</option>
                            <option <?php echo $gns_n_lang=='ak'?'selected="selected"':''; ?>  value="ak">Akan</option>
                            <option <?php echo $gns_n_lang=='am'?'selected="selected"':''; ?>  value="am">Amharic</option>
                            <option <?php echo $gns_n_lang=='an'?'selected="selected"':''; ?>  value="an">Aragonese</option>
                            <option <?php echo $gns_n_lang=='ar'?'selected="selected"':''; ?>  value="ar">Arabic</option>
                            <option <?php echo $gns_n_lang=='as'?'selected="selected"':''; ?>  value="as">Assamese</option>
                            <option <?php echo $gns_n_lang=='av'?'selected="selected"':''; ?>  value="av">Avaric</option>
                            <option <?php echo $gns_n_lang=='ay'?'selected="selected"':''; ?>  value="ay">Aymara</option>
                            <option <?php echo $gns_n_lang=='az'?'selected="selected"':''; ?>  value="az">Azerbaijani</option>
                            <option <?php echo $gns_n_lang=='ba'?'selected="selected"':''; ?>  value="ba">Bashkir</option>
                            <option <?php echo $gns_n_lang=='be'?'selected="selected"':''; ?>  value="be">Belarusian</option>
                            <option <?php echo $gns_n_lang=='bg'?'selected="selected"':''; ?>  value="bg">Bulgarian</option>
                            <option <?php echo $gns_n_lang=='bh'?'selected="selected"':''; ?>  value="bh">Bihari</option>
                            <option <?php echo $gns_n_lang=='bi'?'selected="selected"':''; ?>  value="bi">Bislama</option>
                            <option <?php echo $gns_n_lang=='bm'?'selected="selected"':''; ?>  value="bm">Bambara</option>
                            <option <?php echo $gns_n_lang=='bn'?'selected="selected"':''; ?>  value="bn">Bengali</option>
                            <option <?php echo $gns_n_lang=='bo'?'selected="selected"':''; ?>  value="bo">Tibetan</option>
                            <option <?php echo $gns_n_lang=='br'?'selected="selected"':''; ?>  value="br">Breton</option>
                            <option <?php echo $gns_n_lang=='bs'?'selected="selected"':''; ?>  value="bs">Bosnian</option>
                            <option <?php echo $gns_n_lang=='ca'?'selected="selected"':''; ?>  value="ca">Catalan, Valencian</option>
                            <option <?php echo $gns_n_lang=='ce'?'selected="selected"':''; ?>  value="ce">Chechen</option>
                            <option <?php echo $gns_n_lang=='ch'?'selected="selected"':''; ?>  value="ch">Chamorro</option>
                            <option <?php echo $gns_n_lang=='co'?'selected="selected"':''; ?>  value="co">Corsican</option>
                            <option <?php echo $gns_n_lang=='cr'?'selected="selected"':''; ?>  value="cr">Cree</option>
                            <option <?php echo $gns_n_lang=='cs'?'selected="selected"':''; ?>  value="cs">Czech</option>
                            <option <?php echo $gns_n_lang=='cu'?'selected="selected"':''; ?>  value="cu">Church Slavic</option>
                            <option <?php echo $gns_n_lang=='cv'?'selected="selected"':''; ?>  value="cv">Chuvash</option>
                            <option <?php echo $gns_n_lang=='cy'?'selected="selected"':''; ?>  value="cy">Welsh</option>
                            <option <?php echo $gns_n_lang=='da'?'selected="selected"':''; ?>  value="da">Danish</option>
                            <option <?php echo $gns_n_lang=='de'?'selected="selected"':''; ?>  value="de">German</option>
                            <option <?php echo $gns_n_lang=='dv'?'selected="selected"':''; ?>  value="dv">Divehi, Dhivehi, Maldivian</option>
                            <option <?php echo $gns_n_lang=='dz'?'selected="selected"':''; ?>  value="dz">Dzongkha</option>
                            <option <?php echo $gns_n_lang=='ee'?'selected="selected"':''; ?>  value="ee">Ewe</option>
                            <option <?php echo $gns_n_lang=='el'?'selected="selected"':''; ?>  value="el">Greek</option>
                            <option <?php echo $gns_n_lang=='en'?'selected="selected"':''; ?>  value="en">English</option>
                            <option <?php echo $gns_n_lang=='es'?'selected="selected"':''; ?>  value="es">Spanish</option>
                            <option <?php echo $gns_n_lang=='et'?'selected="selected"':''; ?>  value="et">Estonian</option>
                            <option <?php echo $gns_n_lang=='eu'?'selected="selected"':''; ?>  value="eu">Basque</option>
                            <option <?php echo $gns_n_lang=='fa'?'selected="selected"':''; ?>  value="fa">Persian</option>
                            <option <?php echo $gns_n_lang=='ff'?'selected="selected"':''; ?>  value="ff">Fulah</option>
                            <option <?php echo $gns_n_lang=='fi'?'selected="selected"':''; ?>  value="fi">Finnish</option>
                            <option <?php echo $gns_n_lang=='fj'?'selected="selected"':''; ?>  value="fj">Fijian</option>
                            <option <?php echo $gns_n_lang=='fo'?'selected="selected"':''; ?>  value="fo">Faroese</option>
                            <option <?php echo $gns_n_lang=='fr'?'selected="selected"':''; ?>  value="fr">French</option>
                            <option <?php echo $gns_n_lang=='fy'?'selected="selected"':''; ?>  value="fy">Western Frisian</option>
                            <option <?php echo $gns_n_lang=='ga'?'selected="selected"':''; ?>  value="ga">Irish</option>
                            <option <?php echo $gns_n_lang=='gl'?'selected="selected"':''; ?>  value="gl">Galician</option>
                            <option <?php echo $gns_n_lang=='gn'?'selected="selected"':''; ?>  value="gn">Guaraní</option>
                            <option <?php echo $gns_n_lang=='gu'?'selected="selected"':''; ?>  value="gu">Gujarati</option>
                            <option <?php echo $gns_n_lang=='gv'?'selected="selected"':''; ?>  value="gv">Manx</option>
                            <option <?php echo $gns_n_lang=='ha'?'selected="selected"':''; ?>  value="ha">Hausa</option>
                            <option <?php echo $gns_n_lang=='he'?'selected="selected"':''; ?>  value="he">Hebrew</option>
                            <option <?php echo $gns_n_lang=='hi'?'selected="selected"':''; ?>  value="hi">Hindi</option>
                            <option <?php echo $gns_n_lang=='ho'?'selected="selected"':''; ?>  value="ho">Hiri Motu</option>
                            <option <?php echo $gns_n_lang=='hr'?'selected="selected"':''; ?>  value="hr">Croatian</option>
                            <option <?php echo $gns_n_lang=='ht'?'selected="selected"':''; ?>  value="ht">Haitian, Haitian Creole</option>
                            <option <?php echo $gns_n_lang=='hu'?'selected="selected"':''; ?>  value="hu">Hungarian</option>
                            <option <?php echo $gns_n_lang=='hy'?'selected="selected"':''; ?>  value="hy">Armenian</option>
                            <option <?php echo $gns_n_lang=='hz'?'selected="selected"':''; ?>  value="hz">Herero</option>
                            <option <?php echo $gns_n_lang=='id'?'selected="selected"':''; ?>  value="id">Indonesian</option>
                            <option <?php echo $gns_n_lang=='ig'?'selected="selected"':''; ?>  value="ig">Igbo</option>
                            <option <?php echo $gns_n_lang=='ii'?'selected="selected"':''; ?>  value="ii">Sichuan Yi, Nuosu</option>
                            <option <?php echo $gns_n_lang=='ik'?'selected="selected"':''; ?>  value="ik">Inupiaq</option>
                            <option <?php echo $gns_n_lang=='io'?'selected="selected"':''; ?>  value="io">Ido</option>
                            <option <?php echo $gns_n_lang=='is'?'selected="selected"':''; ?>  value="is">Icelandic</option>
                            <option <?php echo $gns_n_lang=='it'?'selected="selected"':''; ?>  value="it">Italian</option>
                            <option <?php echo $gns_n_lang=='iu'?'selected="selected"':''; ?>  value="iu">Inuktitut</option>
                            <option <?php echo $gns_n_lang=='ja'?'selected="selected"':''; ?>  value="ja">Japanese</option>
                            <option <?php echo $gns_n_lang=='jv'?'selected="selected"':''; ?>  value="jv">Javanese</option>
                            <option <?php echo $gns_n_lang=='ka'?'selected="selected"':''; ?>  value="ka">Georgian</option>
                            <option <?php echo $gns_n_lang=='kg'?'selected="selected"':''; ?>  value="kg">Kongo</option>
                            <option <?php echo $gns_n_lang=='ki'?'selected="selected"':''; ?>  value="ki">Kikuyu, Gikuyu</option>
                            <option <?php echo $gns_n_lang=='kj'?'selected="selected"':''; ?>  value="kj">Kwanyama, Kuanyama</option>
                            <option <?php echo $gns_n_lang=='kk'?'selected="selected"':''; ?>  value="kk">Kazakh</option>
                            <option <?php echo $gns_n_lang=='kl'?'selected="selected"':''; ?>  value="kl">Kalaallisut, Greenlandic</option>
                            <option <?php echo $gns_n_lang=='km'?'selected="selected"':''; ?>  value="km ">Khmer</option>
                            <option <?php echo $gns_n_lang=='kn'?'selected="selected"':''; ?>  value="kn">Kannada</option>
                            <option <?php echo $gns_n_lang=='ko'?'selected="selected"':''; ?>  value="ko">Korean</option>
                            <option <?php echo $gns_n_lang=='kr'?'selected="selected"':''; ?>  value="kr">Kanuri</option>
                            <option <?php echo $gns_n_lang=='ks'?'selected="selected"':''; ?>  value="ks">Kashmiri</option>
                            <option <?php echo $gns_n_lang=='ku'?'selected="selected"':''; ?>  value="ku">Kurdish</option>
                            <option <?php echo $gns_n_lang=='kv'?'selected="selected"':''; ?>  value="kv">Komi</option>
                            <option <?php echo $gns_n_lang=='kw'?'selected="selected"':''; ?>  value="kw">Cornish</option>
                            <option <?php echo $gns_n_lang=='ky'?'selected="selected"':''; ?>  value="ky">Kirghiz, Kyrgyz</option>
                            <option <?php echo $gns_n_lang=='lb'?'selected="selected"':''; ?>  value="lb">Luxembourgish, Letzeburgesch</option>
                            <option <?php echo $gns_n_lang=='lg'?'selected="selected"':''; ?>  value="lg">Ganda</option>
                            <option <?php echo $gns_n_lang=='li'?'selected="selected"':''; ?>  value="li">Limburgish, Limburgan, Limburger</option>
                            <option <?php echo $gns_n_lang=='ln'?'selected="selected"':''; ?>  value="ln">Lingala</option>
                            <option <?php echo $gns_n_lang=='lo'?'selected="selected"':''; ?>  value="lo">Lao</option>
                            <option <?php echo $gns_n_lang=='lt'?'selected="selected"':''; ?>  value="lt">Lithuanian</option>
                            <option <?php echo $gns_n_lang=='lu'?'selected="selected"':''; ?>  value="lu">Luba-Katanga</option>
                            <option <?php echo $gns_n_lang=='lv'?'selected="selected"':''; ?>  value="lv">Latvian</option>
                            <option <?php echo $gns_n_lang=='mg'?'selected="selected"':''; ?>  value="mg">Malagasy</option>
                            <option <?php echo $gns_n_lang=='mh'?'selected="selected"':''; ?>  value="mh">Marshallese</option>
                            <option <?php echo $gns_n_lang=='mi'?'selected="selected"':''; ?>  value="mi">Maori</option>
                            <option <?php echo $gns_n_lang=='mk'?'selected="selected"':''; ?>  value="mk">Macedonian</option>
                            <option <?php echo $gns_n_lang=='ml'?'selected="selected"':''; ?>  value="ml">Malayalam</option>
                            <option <?php echo $gns_n_lang=='mn'?'selected="selected"':''; ?>  value="mn">Mongolian</option>
                            <option <?php echo $gns_n_lang=='mr'?'selected="selected"':''; ?>  value="mr">Marathi</option>
                            <option <?php echo $gns_n_lang=='ms'?'selected="selected"':''; ?>  value="ms">Malay</option>
                            <option <?php echo $gns_n_lang=='mt'?'selected="selected"':''; ?>  value="mt">Maltese</option>
                            <option <?php echo $gns_n_lang=='my'?'selected="selected"':''; ?>  value="my">Burmese</option>
                            <option <?php echo $gns_n_lang=='na'?'selected="selected"':''; ?>  value="na">Nauru</option>
                            <option <?php echo $gns_n_lang=='nb'?'selected="selected"':''; ?>  value="nb">Norwegian Bokmal</option>
                            <option <?php echo $gns_n_lang=='nd'?'selected="selected"':''; ?>  value="nd">North Ndebele</option>
                            <option <?php echo $gns_n_lang=='ne'?'selected="selected"':''; ?>  value="ne">Nepali</option>
                            <option <?php echo $gns_n_lang=='ng'?'selected="selected"':''; ?>  value="ng">Ndonga</option>
                            <option <?php echo $gns_n_lang=='nl'?'selected="selected"':''; ?>  value="nl">Dutch, Flemish</option>
                            <option <?php echo $gns_n_lang=='nn'?'selected="selected"':''; ?>  value="nn">Norwegian Nynorsk</option>
                            <option <?php echo $gns_n_lang=='no'?'selected="selected"':''; ?>  value="no">Norwegian</option>
                            <option <?php echo $gns_n_lang=='nr'?'selected="selected"':''; ?>  value="nr">South Ndebele</option>
                            <option <?php echo $gns_n_lang=='nv'?'selected="selected"':''; ?>  value="nv">Navajo, Navaho</option>
                            <option <?php echo $gns_n_lang=='ny'?'selected="selected"':''; ?>  value="ny">Chichewa, Chewa, Nyanja</option>
                            <option <?php echo $gns_n_lang=='oj'?'selected="selected"':''; ?>  value="oj">Ojibwa</option>
                            <option <?php echo $gns_n_lang=='om'?'selected="selected"':''; ?>  value="om">Oromo</option>
                            <option <?php echo $gns_n_lang=='or'?'selected="selected"':''; ?>  value="or">Oriya</option>
                            <option <?php echo $gns_n_lang=='os'?'selected="selected"':''; ?>  value="os">Ossetian, Ossetic</option>
                            <option <?php echo $gns_n_lang=='pa'?'selected="selected"':''; ?>  value="pa">Panjabi, Punjabi</option>
                            <option <?php echo $gns_n_lang=='pi'?'selected="selected"':''; ?>  value="pi">Pali</option>
                            <option <?php echo $gns_n_lang=='pl'?'selected="selected"':''; ?>  value="pl">Polish</option>
                            <option <?php echo $gns_n_lang=='ps'?'selected="selected"':''; ?>  value="ps">Pashto, Pushto</option>
                            <option <?php echo $gns_n_lang=='pt'?'selected="selected"':''; ?>  value="pt">Portuguese</option>
                            <option <?php echo $gns_n_lang=='qu'?'selected="selected"':''; ?>  value="qu">Quechua</option>
                            <option <?php echo $gns_n_lang=='rm'?'selected="selected"':''; ?>  value="rm">Romansh</option>
                            <option <?php echo $gns_n_lang=='rn'?'selected="selected"':''; ?>  value="rn">Rundi</option>
                            <option <?php echo $gns_n_lang=='ro'?'selected="selected"':''; ?>  value="ro">Romanian, Moldavian, Moldovan</option>
                            <option <?php echo $gns_n_lang=='ru'?'selected="selected"':''; ?>  value="ru">Russian</option>
                            <option <?php echo $gns_n_lang=='rw'?'selected="selected"':''; ?>  value="rw">Kinyarwanda</option>
                            <option <?php echo $gns_n_lang=='sa'?'selected="selected"':''; ?>  value="sa">Sanskrit</option>
                            <option <?php echo $gns_n_lang=='sc'?'selected="selected"':''; ?>  value="sc">Sardinian</option>
                            <option <?php echo $gns_n_lang=='sd'?'selected="selected"':''; ?>  value="sd">Sindhi</option>
                            <option <?php echo $gns_n_lang=='se'?'selected="selected"':''; ?>  value="se">Northern Sami</option>
                            <option <?php echo $gns_n_lang=='sg'?'selected="selected"':''; ?>  value="sg">Sango</option>
                            <option <?php echo $gns_n_lang=='si'?'selected="selected"':''; ?>  value="si">Sinhala, Sinhalese</option>
                            <option <?php echo $gns_n_lang=='sk'?'selected="selected"':''; ?>  value="sk">Slovak</option>
                            <option <?php echo $gns_n_lang=='sl'?'selected="selected"':''; ?>  value="sl">Slovene</option>
                            <option <?php echo $gns_n_lang=='sm'?'selected="selected"':''; ?>  value="sm">Samoan</option>
                            <option <?php echo $gns_n_lang=='sn'?'selected="selected"':''; ?>  value="sn">Shona</option>
                            <option <?php echo $gns_n_lang=='so'?'selected="selected"':''; ?>  value="so">Somali</option>
                            <option <?php echo $gns_n_lang=='sq'?'selected="selected"':''; ?>  value="sq">Albanian</option>
                            <option <?php echo $gns_n_lang=='sr'?'selected="selected"':''; ?>  value="sr">Serbian</option>
                            <option <?php echo $gns_n_lang=='ss'?'selected="selected"':''; ?>  value="ss">Swati</option>
                            <option <?php echo $gns_n_lang=='st'?'selected="selected"':''; ?>  value="st">Southern Sotho</option>
                            <option <?php echo $gns_n_lang=='su'?'selected="selected"':''; ?>  value="su">Sundanese</option>
                            <option <?php echo $gns_n_lang=='sv'?'selected="selected"':''; ?>  value="sv">Swedish</option>
                            <option <?php echo $gns_n_lang=='sw'?'selected="selected"':''; ?>  value="sw">Swahili</option>
                            <option <?php echo $gns_n_lang=='ta'?'selected="selected"':''; ?>  value="ta">Tamil</option>
                            <option <?php echo $gns_n_lang=='te'?'selected="selected"':''; ?>  value="te">Telugu</option>
                            <option <?php echo $gns_n_lang=='tg'?'selected="selected"':''; ?>  value="tg">Tajik</option>
                            <option <?php echo $gns_n_lang=='th'?'selected="selected"':''; ?>  value="th">Thai</option>
                            <option <?php echo $gns_n_lang=='ti'?'selected="selected"':''; ?>  value="ti">Tigrinya</option>
                            <option <?php echo $gns_n_lang=='tk'?'selected="selected"':''; ?>  value="tk">Turkmen</option>
                            <option <?php echo $gns_n_lang=='tl'?'selected="selected"':''; ?>  value="tl">Tagalog</option>
                            <option <?php echo $gns_n_lang=='tn'?'selected="selected"':''; ?>  value="tn">Tswana</option>
                            <option <?php echo $gns_n_lang=='to'?'selected="selected"':''; ?>  value="to">Tonga (Tonga Islands)</option>
                            <option <?php echo $gns_n_lang=='tr'?'selected="selected"':''; ?>  value="tr">Turkish</option>
                            <option <?php echo $gns_n_lang=='ts'?'selected="selected"':''; ?>  value="ts">Tsonga</option>
                            <option <?php echo $gns_n_lang=='tt'?'selected="selected"':''; ?>  value="tt">Tatar</option>
                            <option <?php echo $gns_n_lang=='tw'?'selected="selected"':''; ?>  value="tw">Twi</option>
                            <option <?php echo $gns_n_lang=='ty'?'selected="selected"':''; ?>  value="ty">Tahitian</option>
                            <option <?php echo $gns_n_lang=='ug'?'selected="selected"':''; ?>  value="ug">Uighur, Uyghur</option>
                            <option <?php echo $gns_n_lang=='uk'?'selected="selected"':''; ?>  value="uk">Ukrainian</option>
                            <option <?php echo $gns_n_lang=='ur'?'selected="selected"':''; ?>  value="ur">Urdu</option>
                            <option <?php echo $gns_n_lang=='uz'?'selected="selected"':''; ?>  value="uz">Uzbek</option>
                            <option <?php echo $gns_n_lang=='ve'?'selected="selected"':''; ?>  value="ve">Venda</option>
                            <option <?php echo $gns_n_lang=='vi'?'selected="selected"':''; ?>  value="vi">Vietnamese</option>
                            <option <?php echo $gns_n_lang=='vo'?'selected="selected"':''; ?>  value="vo">Volapük</option>
                            <option <?php echo $gns_n_lang=='wa'?'selected="selected"':''; ?>  value="wa">Walloon</option>
                            <option <?php echo $gns_n_lang=='wo'?'selected="selected"':''; ?>  value="wo">Wolof</option>
                            <option <?php echo $gns_n_lang=='xh'?'selected="selected"':''; ?>  value="xh">Xhosa</option>
                            <option <?php echo $gns_n_lang=='yi'?'selected="selected"':''; ?>  value="yi">Yiddish</option>
                            <option <?php echo $gns_n_lang=='yo'?'selected="selected"':''; ?>  value="yo">Yoruba</option>
                            <option <?php echo $gns_n_lang=='za'?'selected="selected"':''; ?>  value="za">Zhuang, Chuang</option>
                            <option <?php echo $gns_n_lang=='zh-cn'?'selected="selected"':''; ?>  value="zh-cn">Chinese, Simplified</option>
                            <option <?php echo $gns_n_lang=='zh-tw'?'selected="selected"':''; ?>  value="zh-tw">Chinese, Traditional</option>
                            <option <?php echo $gns_n_lang=='zu'?'selected="selected"':''; ?>  value="zu">Zulu</option>
                        </select></td>
            <td><a href="http://gnews.briefer.net/title/publication-languages.html" target="_blank">Learn about publication languages</a></td>
			</tr>
            <tr>
			<th scope="row" style="text-align:right;"><?php _e('Publication Genre') ?></th>
			<td><select name="gns_n_genres_type">
                        	<option <?php echo $gns_n_genres_type=="NA"?'selected="selected"':'';?> value="NA">Not Applicable</option>
							<option <?php echo $gns_n_genres_type=="Blog"?'selected="selected"':'';?> value="Blog">Blog</option>
							<option <?php echo $gns_n_genres_type=="PressRelease"?'selected="selected"':'';?> value="PressRelease">Press Release</option>
							<option <?php echo $gns_n_genres_type=="UserGenerated"?'selected="selected"':'';?> value="UserGenerated">UserGenerated</option>
                            <option <?php echo $gns_n_genres_type=="Satire"?'selected="selected"':'';?> value="Satire">Satire</option>
                            <option <?php echo $gns_n_genres_type=="OpEd"?'selected="selected"':'';?> value="OpEd">OpEd</option>
                            <option <?php echo $gns_n_genres_type=="Opinion"?'selected="selected"':'';?> value="Opinion">Opinion</option>
                        </select></td>
			<td>&nbsp;</td>
			</tr>
			<tr>
			<th scope="row" style="text-align:right;"><?php _e('Article Access type') ?></th>
			<td><select name="gns_n_access_type">
                    	<option <?php echo $gns_n_access_type=="NA"?'selected="selected"':'';?> value="NA">Not Applicable</option>
						<option <?php echo $gns_n_access_type=="Subscription"?'selected="selected"':'';?> value="Subscription">Subscription</option>
						<option <?php echo $gns_n_access_type=="Registration"?'selected="selected"':'';?> value="Registration">Registration</option>		
					</select></td>
			<td>&nbsp;</td>
			</tr>
			</table>
			<p class="submit"> <input type="submit" value="&nbsp;&mdash;&nbsp;Save&nbsp;&mdash;&nbsp;" /></p>
		</form>
					</div>
				</div>
			</div>
            <div class="meta-box-sortabless"> 
				<div class="postbox"> 
					<h3 class="hndle"><span>Info</span></h3>
					<div class="inside">
                    	<p>Your news sitemap is located at <code><?php echo $gns_ns_loc; ?></code> <a href="<?php echo $gns_ns_loc; ?>" target="_blank">(view sitemap)</a><br />
						Use the following path in Webmaster Tools during the news sitemap submission: <code><?php echo $gns_WMT; ?></code></p>
                    	<p><strong>Must know:</strong>
                            <ol>
                            	<li>If you didn't already, <a href="http://www.google.com/support/news_pub/bin/request.py?contact_type=suggest_content" target="_blank">suggest your site for inclusion</a> in Google News. Without this step your content will not be included in Google News!</li>
                                <li>Follow the steps documented in the <a href="http://www.google.com/support/news_pub/bin/answer.py?answer=74289" target="_blank">Google News Help Center</a> in order to successfully submit your news sitemap</li>
                            </ol>
                        </p>
                        <p>Learn more about the updated news sitemap specification at <a href="http://www.google.com/support/webmasters/bin/answer.py?hl=en&answer=74288" target="_blank">http://www.google.com/support/webmasters/bin/answer.py?hl=en&amp;answer=74288</a></p>
                        <p><strong>Should you need Google News related help or information, please ask in the <a href="http://www.google.com/support/forum/p/news?hl=en" target="_blank">Google News Help Forum</a></strong></p>		
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
</div> 
</div>
<?php
	}
?>
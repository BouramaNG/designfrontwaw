$flags = @{
    "fr" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/fr.svg"
    "de" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/de.svg"
    "es" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/es.svg"
    "it" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/it.svg"
    "be" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/be.svg"
    "us" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/us.svg"
    "pr" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/pr.svg"
    "sa" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/sa.svg"
    "ma" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/ma.svg"
    "tn" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/tn.svg"
    "ci" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/ci.svg"
    "gh" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/gh.svg"
    "ng" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/ng.svg"
    "gb" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/gb.svg"
    "ca" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/ca.svg"
    "jp" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/jp.svg"
    "au" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/au.svg"
    "br" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/br.svg"
    "tr" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/tr.svg"
    "eu" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/eu.svg"
    "af" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/af.svg"
    "na" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/na.svg"
    "me" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/me.svg"
    "world" = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/svg/world.svg"
}

foreach ($flag in $flags.GetEnumerator()) {
    $url = $flag.Value
    $filename = "$($flag.Key).svg"
    $path = Join-Path -Path "public/flags" -ChildPath $filename
    
    Write-Host "Downloading $filename..."
    Invoke-WebRequest -Uri $url -OutFile $path
}
Write-Host "All flags downloaded successfully!"

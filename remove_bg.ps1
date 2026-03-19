Add-Type -AssemblyName System.Drawing

$colors = @("pink", "yellow", "white", "red")
$dir = "d:\Docs\New folder\assets"

foreach ($color in $colors) {
    $path = "$dir\$color.png"
    $outPath = "$dir\${color}_transparent.png"
    
    if (Test-Path $path) {
        try {
            # Need to create from file, but lock is held unless we copy to memory, 
            # or just load, save to outPath, dispose, then overwrite
            $bmp = [System.Drawing.Bitmap]::FromFile($path)
            $newBmp = New-Object System.Drawing.Bitmap $bmp.Width, $bmp.Height
            
            for ($x = 0; $x -lt $bmp.Width; $x++) {
                for ($y = 0; $y -lt $bmp.Height; $y++) {
                    $pixel = $bmp.GetPixel($x, $y)
                    # If pixel is pure white or very close
                    if ($pixel.R -gt 250 -and $pixel.G -gt 250 -and $pixel.B -gt 250) {
                        $newBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                    } else {
                        $newBmp.SetPixel($x, $y, $pixel)
                    }
                }
            }
            $newBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $bmp.Dispose()
            $newBmp.Dispose()
            
            # Overwrite the original
            Move-Item -Path $outPath -Destination $path -Force
            Write-Host "Processed $color"
        } catch {
            Write-Host "Failed on $color : $_"
        }
    } else {
        Write-Host "Not found $path"
    }
}

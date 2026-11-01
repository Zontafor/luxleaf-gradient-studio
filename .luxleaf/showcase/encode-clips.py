"""Encode actual canvas recordings; requires ffmpeg and ffprobe on PATH."""
from pathlib import Path
import hashlib, json, subprocess
media = Path(__file__).resolve().parent.parent / 'media'
manifest = []
for name in ['emerald-tide', 'orchid-orbit', 'copper-dawn']:
    source, mp4 = media / (name + '.webm'), media / (name + '.mp4')
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(source),'-an','-vf','fps=30','-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart',str(mp4)],check=True)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss','3','-i',str(mp4),'-frames:v','1','-q:v','2',str(media/(name+'.jpg'))],check=True)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(mp4),'-t','6','-filter_complex','fps=10,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=5','-loop','0',str(media/(name+'.gif'))],check=True)
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_entries','stream=codec_name,width,height,avg_frame_rate,nb_read_frames','-show_entries','format=duration,size','-of','json',str(mp4)],text=True))
    frames=[subprocess.check_output(['ffmpeg','-v','error','-ss',str(t),'-i',str(mp4),'-frames:v','1','-vf','scale=64:36,format=rgb24','-f','rawvideo','-']) for t in [1,9]]
    difference=sum(abs(a-b) for a,b in zip(*frames))/len(frames[0])
    assert float(info['format']['duration']) >= 10 and info['streams'][0]['width']==960 and difference>2, (name,info,difference)
    manifest.append({'name':name,'capture':'Actual LuxLeaf showcase canvas; no generated/synthetic video','video':info,'meanPixelChangeBetweenSeconds1And9':round(difference,3),'sha256':hashlib.sha256(mp4.read_bytes()).hexdigest(),'audio':False})
(media/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))

import os
import subprocess
import glob
import re

def check_audio_stream(input_file):
    # Check if video has an audio stream
    try:
        cmd = [
            'ffprobe', '-v', 'error', 
            '-select_streams', 'a', 
            '-show_entries', 'stream=codec_type', 
            '-of', 'csv=p=0', 
            input_file
        ]
        output = subprocess.check_output(cmd).decode('utf-8').strip()
        return 'audio' in output
    except Exception as e:
        print(f"Error checking audio stream for {input_file}: {e}")
        return False

def compress_video(input_file):
    base, ext = os.path.splitext(input_file)
    
    # Avoid double compressing or processing generated files
    if '_mobile' in base or '_desktop' in base or '_poster' in base:
        return
        
    print(f"\nProcessing: {input_file}")
    
    # Target output paths
    mobile_output = f"{base}_mobile.mp4"
    desktop_output = f"{base}_desktop.mp4"
    poster_output = f"{base}_poster.webp"
    
    if os.path.exists(mobile_output) and os.path.exists(desktop_output) and os.path.exists(poster_output):
        print(f"Skipping already compressed file: {input_file}")
        return
        
    has_audio = check_audio_stream(input_file)
    
    # 1. Generate poster frame (extremely lightweight WebP)
    print(f"Generating WebP poster frame for {input_file}...")
    poster_cmd = [
        'ffmpeg', '-y',
        '-ss', '00:00:00.1',
        '-i', input_file,
        '-vframes', '1',
        '-vf', 'scale=480:-2',
        '-q:v', '30',
        poster_output
    ]
    try:
        subprocess.run(poster_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        size_kb = os.path.getsize(poster_output) / 1024
        print(f"Generated poster: {poster_output} ({size_kb:.2f} KB)")
    except Exception as e:
        print(f"Failed to generate poster frame for {input_file}: {e}")

    # 2. Generate Desktop version (H.264, max 1080p, CRF 27)
    print(f"Compressing Desktop version for {input_file}...")
    desktop_cmd = [
        'ffmpeg', '-y',
        '-i', input_file,
        '-c:v', 'libx264',
        '-crf', '27',
        '-preset', 'medium',
        '-vf', 'scale=min(1080\\,iw):-2',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart'
    ]
    if has_audio:
        desktop_cmd += ['-c:a', 'aac', '-b:a', '64k']
    else:
        desktop_cmd += ['-an']
    desktop_cmd.append(desktop_output)
    
    try:
        subprocess.run(desktop_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        size_mb = os.path.getsize(desktop_output) / (1024 * 1024)
        print(f"Generated Desktop video: {desktop_output} ({size_mb:.2f} MB)")
    except Exception as e:
        print(f"Failed to generate Desktop video for {input_file}: {e}")

    # 3. Generate Mobile version (H.264, max 720p, CRF 28)
    print(f"Compressing Mobile version for {input_file}...")
    mobile_cmd = [
        'ffmpeg', '-y',
        '-i', input_file,
        '-c:v', 'libx264',
        '-crf', '28',
        '-preset', 'medium',
        '-vf', 'scale=min(720\\,iw):-2',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart'
    ]
    if has_audio:
        mobile_cmd += ['-c:a', 'aac', '-b:a', '48k']
    else:
        mobile_cmd += ['-an']
    mobile_cmd.append(mobile_output)
    
    try:
        subprocess.run(mobile_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        size_mb = os.path.getsize(mobile_output) / (1024 * 1024)
        print(f"Generated Mobile video: {mobile_output} ({size_mb:.2f} MB)")
    except Exception as e:
        print(f"Failed to generate Mobile video for {input_file}: {e}")

def main():
    public_dir = '/public'
    if not os.path.exists(public_dir):
        public_dir = './public'
        
    print(f"Searching in directory: {public_dir}")
    videos = []
    for ext in ['*.mp4', '*.webm']:
        videos.extend(glob.glob(os.path.join(public_dir, ext)))
        
    # Sort to run consistently
    videos.sort()
    
    # Filter out generated outputs
    videos = [v for v in videos if not any(x in v for x in ['_mobile', '_desktop', '_poster'])]
    
    print(f"Found {len(videos)} source videos to process.")
    for v in videos:
        compress_video(v)
        
    print("\nAll video compression and poster frame generation tasks completed!")

if __name__ == '__main__':
    main()

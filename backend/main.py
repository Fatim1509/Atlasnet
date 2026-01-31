"""
AtlasNet - Simplified Backend with In-Memory Data
No database required - perfect for Railway deployment
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random
from typing import List, Dict

app = FastAPI(
    title="AtlasNet API",
    version="2.0.0",
    description="Cybersecurity Observation Dashboard - Zero-Config Deployment"
)

# CORS Configuration - Allow all origins for easy deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# IN-MEMORY DATA GENERATION
# ============================================================================

ATTACK_TYPES = {
    'brute_force': {
        'severity': 'high',
        'risk': 75,
        'description': 'Repeated authentication attempts detected',
        'educational': 'Brute force attacks systematically try passwords to gain unauthorized access.',
        'mitigation': 'Implement rate limiting, account lockouts, and multi-factor authentication.'
    },
    'reconnaissance': {
        'severity': 'medium',
        'risk': 50,
        'description': 'Network reconnaissance activity detected',
        'educational': 'Attackers gather information about your network to find vulnerabilities.',
        'mitigation': 'Use firewalls, implement IDS/IPS, and monitor for scanning activity.'
    },
    'fuzzing': {
        'severity': 'high',
        'risk': 80,
        'description': 'Input fuzzing or injection attempt detected',
        'educational': 'Fuzzing sends malformed data to find vulnerabilities like buffer overflows.',
        'mitigation': 'Implement input validation, use parameterized queries, apply security headers.'
    },
    'dos_attempt': {
        'severity': 'critical',
        'risk': 90,
        'description': 'Denial of Service attempt detected',
        'educational': 'DoS attacks overwhelm systems to make services unavailable.',
        'mitigation': 'Implement rate limiting, use CDN/DDoS protection, configure resource limits.'
    },
    'credential_stuffing': {
        'severity': 'critical',
        'risk': 85,
        'description': 'Credential stuffing attack detected',
        'educational': 'Attackers use leaked credentials from other breaches.',
        'mitigation': 'Monitor for breaches, implement MFA, use CAPTCHA on login forms.'
    },
    'exploit_attempt': {
        'severity': 'critical',
        'risk': 95,
        'description': 'Exploitation attempt detected',
        'educational': 'Exploit attempts target known vulnerabilities in software.',
        'mitigation': 'Keep systems patched, use vulnerability scanners, implement WAF.'
    },
    'suspicious_traffic': {
        'severity': 'medium',
        'risk': 45,
        'description': 'Suspicious network traffic detected',
        'educational': 'Unusual patterns may indicate reconnaissance or data exfiltration.',
        'mitigation': 'Use behavioral analysis, implement network segmentation, monitor traffic.'
    }
}

COUNTRIES = ['US', 'CN', 'RU', 'GB', 'DE', 'FR', 'JP', 'KR', 'BR', 'IN', 'CA', 'AU', 'NL', 'SE', 'PL', 'IR', 'KP']
SERVICES = ['ssh', 'http', 'https', 'ftp', 'api']
PORTS = {'ssh': 22, 'http': 80, 'https': 443, 'ftp': 21, 'api': 8080}

def generate_ip():
    return f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"

def generate_events(count=500):
    """Generate sample events on startup"""
    events = []
    now = datetime.utcnow()
    
    for i in range(count):
        attack_type = random.choice(list(ATTACK_TYPES.keys()))
        attack_data = ATTACK_TYPES[attack_type]
        service = random.choice(SERVICES)
        
        event = {
            'id': i + 1,
            'timestamp': (now - timedelta(days=random.randint(0, 7), 
                                         hours=random.randint(0, 23), 
                                         minutes=random.randint(0, 59))).isoformat(),
            'source_ip': generate_ip(),
            'source_country': random.choice(COUNTRIES),
            'target_service': service,
            'target_port': PORTS[service],
            'event_type': attack_type,
            'severity': attack_data['severity'],
            'risk_score': attack_data['risk'] + random.randint(-10, 10),
            'description': attack_data['description'],
            'educational_note': attack_data['educational'],
            'mitigation_tip': attack_data['mitigation']
        }
        events.append(event)
    
    # Sort by timestamp descending
    events.sort(key=lambda x: x['timestamp'], reverse=True)
    return events

# Generate events on startup
EVENTS = generate_events(500)
DECOYS = [
    {'id': 1, 'name': 'SSH Honeypot', 'service_type': 'ssh', 'port': 22, 'is_active': True},
    {'id': 2, 'name': 'HTTP Honeypot', 'service_type': 'http', 'port': 80, 'is_active': True},
    {'id': 3, 'name': 'HTTPS Honeypot', 'service_type': 'https', 'port': 443, 'is_active': True},
    {'id': 4, 'name': 'FTP Honeypot', 'service_type': 'ftp', 'port': 21, 'is_active': True},
    {'id': 5, 'name': 'API Honeypot', 'service_type': 'api', 'port': 8080, 'is_active': True},
]

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
def root():
    return {
        "name": "AtlasNet API",
        "version": "2.0.0",
        "status": "operational",
        "message": "Zero-config deployment ready!",
        "docs": "/docs"
    }

@app.get("/api/stats")
def get_stats():
    """Get dashboard statistics"""
    high_severity = len([e for e in EVENTS if e['severity'] in ['high', 'critical']])
    unique_ips = len(set(e['source_ip'] for e in EVENTS))
    last_24h = len([e for e in EVENTS if (datetime.utcnow() - datetime.fromisoformat(e['timestamp'])).days == 0])
    
    # Get top attack type
    from collections import Counter
    attack_counts = Counter(e['event_type'] for e in EVENTS)
    top_attack = attack_counts.most_common(1)[0][0] if attack_counts else 'None'
    
    avg_risk = sum(e['risk_score'] for e in EVENTS) / len(EVENTS) if EVENTS else 0
    
    return {
        'total_events': len(EVENTS),
        'active_decoys': len([d for d in DECOYS if d['is_active']]),
        'unique_ips': unique_ips,
        'high_severity_events': high_severity,
        'events_last_24h': last_24h,
        'top_attack_type': top_attack,
        'average_risk_score': round(avg_risk, 2)
    }

@app.get("/api/timeline")
def get_timeline(days: int = 7):
    """Get timeline data"""
    from collections import defaultdict
    
    cutoff = datetime.utcnow() - timedelta(days=days)
    relevant_events = [e for e in EVENTS if datetime.fromisoformat(e['timestamp']) >= cutoff]
    
    # Group by hour
    hourly_counts = defaultdict(int)
    for event in relevant_events:
        dt = datetime.fromisoformat(event['timestamp'])
        hour_key = dt.strftime('%Y-%m-%d %H:00')
        hourly_counts[hour_key] += 1
    
    data = [{'timestamp': ts, 'count': count, 'hour': datetime.strptime(ts, '%Y-%m-%d %H:00').hour} 
            for ts, count in sorted(hourly_counts.items())]
    
    return {
        'data': data,
        'total_events': len(relevant_events),
        'date_range': f"Last {days} days"
    }

@app.get("/api/behavior")
def get_behavior():
    """Get behavior distribution"""
    from collections import defaultdict, Counter
    
    # Count by attack type
    type_counts = Counter(e['event_type'] for e in EVENTS)
    total = len(EVENTS)
    
    distributions = []
    for attack_type, count in type_counts.items():
        # Get severity breakdown
        severity_breakdown = {}
        for event in EVENTS:
            if event['event_type'] == attack_type:
                sev = event['severity']
                severity_breakdown[sev] = severity_breakdown.get(sev, 0) + 1
        
        distributions.append({
            'category': attack_type.replace('_', ' ').title(),
            'count': count,
            'percentage': round((count / total * 100), 2),
            'severity_breakdown': severity_breakdown
        })
    
    return {
        'distributions': distributions,
        'total_categories': len(distributions)
    }

@app.get("/api/heatmap")
def get_heatmap():
    """Get hourly activity heatmap"""
    from collections import defaultdict
    
    heatmap_data = defaultdict(lambda: defaultdict(int))
    days_map = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 
                4: 'Friday', 5: 'Saturday', 6: 'Sunday'}
    
    for event in EVENTS:
        dt = datetime.fromisoformat(event['timestamp'])
        day = days_map[dt.weekday()]
        hour = dt.hour
        heatmap_data[day][hour] += 1
    
    cells = []
    max_value = 0
    for day in days_map.values():
        for hour in range(24):
            value = heatmap_data[day][hour]
            max_value = max(max_value, value)
            cells.append({'hour': hour, 'day': day, 'value': value})
    
    return {'data': cells, 'max_value': max_value}

@app.get("/api/replay")
def get_replay(scenario: str = 'brute_force'):
    """Get replay scenario"""
    matching_events = [e for e in EVENTS if e['event_type'] == scenario][:10]
    
    if not matching_events:
        matching_events = EVENTS[:10]
    
    steps = []
    for idx, event in enumerate(matching_events, 1):
        steps.append({
            'step': idx,
            'timestamp': event['timestamp'],
            'event_type': event['event_type'],
            'source_ip': event['source_ip'],
            'target_service': event['target_service'],
            'description': event['description'],
            'educational_note': event['educational_note'],
            'mitigation_tip': event['mitigation_tip'],
            'severity': event['severity'],
            'risk_score': event['risk_score']
        })
    
    descriptions = {
        'brute_force': 'Brute force attack demonstration showing repeated authentication attempts.',
        'reconnaissance': 'Reconnaissance activities showing information gathering techniques.',
        'fuzzing': 'Fuzzing attacks demonstrating input validation vulnerability testing.',
        'dos_attempt': 'Denial of Service attack showing resource exhaustion techniques.',
        'exploit_attempt': 'Exploitation attempts targeting known vulnerabilities.'
    }
    
    return {
        'steps': steps,
        'total_steps': len(steps),
        'scenario_name': scenario.replace('_', ' ').title(),
        'scenario_description': descriptions.get(scenario, 'Security event scenario demonstration')
    }

@app.get("/api/events")
def get_events(limit: int = 100, offset: int = 0, severity: str = None):
    """Get paginated events"""
    filtered = EVENTS
    if severity:
        filtered = [e for e in EVENTS if e['severity'] == severity]
    
    return filtered[offset:offset + limit]

@app.get("/api/top-ips")
def get_top_ips(limit: int = 10):
    """Get top source IPs"""
    from collections import Counter
    
    ip_data = {}
    for event in EVENTS:
        ip = event['source_ip']
        if ip not in ip_data:
            ip_data[ip] = {
                'ip': ip,
                'country': event['source_country'],
                'count': 0,
                'last_seen': event['timestamp']
            }
        ip_data[ip]['count'] += 1
        if event['timestamp'] > ip_data[ip]['last_seen']:
            ip_data[ip]['last_seen'] = event['timestamp']
    
    sorted_ips = sorted(ip_data.values(), key=lambda x: x['count'], reverse=True)
    return sorted_ips[:limit]

@app.get("/api/decoys")
def get_decoys():
    """Get decoy services"""
    return DECOYS

@app.get("/health")
def health():
    """Health check for Railway"""
    return {"status": "healthy", "events_loaded": len(EVENTS)}

# For Railway deployment
if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

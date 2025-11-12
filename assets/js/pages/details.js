import { getFishDetails } from '../data/fetcher.js';

export function goBack() {
    window.location.href = 'index.html';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const fishId = urlParams.get('id');
    
    if (!fishId) {
        alert('No fish ID provided');
        goBack();
        return;
    }
    
    try {
        const fishData = await getFishDetails(fishId);
        
        // Extract fish and metadata
        const fish = fishData.fish;
        const imageUrl = fishData.imageUrl;
        const capturedDate = fishData.timestamp || fish.captureTimestamp;
        
        // Set image
        document.getElementById('fishImage').src = imageUrl || fish.image || '';
        
        // Basic info
        document.getElementById('fishName').textContent = fish.name || 'Unknown Fish';
        document.getElementById('family').textContent = fish.family || '-';
        document.getElementById('waterType').textContent = fish.waterType || '-';
        
        // Size range
        const sizeRange = fish.minSize && fish.maxSize 
            ? `${fish.minSize}-${fish.maxSize}cm`
            : '-';
        document.getElementById('sizeRange').textContent = sizeRange;
        
        // Depth range
        const depthRange = fish.depthRangeMin !== undefined && fish.depthRangeMax !== undefined
            ? `${fish.depthRangeMin}-${fish.depthRangeMax}m`
            : '-';
        document.getElementById('depthRange').textContent = depthRange;
        
        document.getElementById('environment').textContent = fish.environment || '-';
        document.getElementById('region').textContent = fish.region || '-';
        document.getElementById('conservation').textContent = fish.conservationStatus || '-';
        
        // AI Accuracy
        const accuracy = fish.aiAccuracy ? `${fish.aiAccuracy}%` : '-';
        document.getElementById('aiAccuracy').textContent = accuracy;
        
        // Captured date
        const capturedText = capturedDate ? formatDate(capturedDate) : '-';
        document.getElementById('captured').textContent = capturedText;
        
        // Descriptions
        document.getElementById('description').textContent = fish.description || 'No description available.';
        document.getElementById('colorDescription').textContent = fish.colorDescription || 'No appearance description available.';
        
        // Conservation status description
        const consStatusDesc = fish.consStatusDescription || fish.conservationStatus;
        if (consStatusDesc) {
            document.getElementById('consStatusDescription').textContent = consStatusDesc;
        } else {
            document.getElementById('conservationSection').style.display = 'none';
        }
        
    } catch (error) {
        console.error('Failed to load fish details:', error);
        alert('Failed to load fish details');
        goBack();
    }
}
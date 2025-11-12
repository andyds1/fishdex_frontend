const API_BASE_URL = 'https://your-backend-api.com/api';

const MOCK_DATA = {
    recentCatches: [
        {
            id: 1,
            name: 'Clownfish',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FF8C42" width="100" height="100"/><circle fill="%23fff" cx="35" cy="40" r="8"/><circle fill="%23000" cx="35" cy="40" r="4"/></svg>',
            time: '1h ago'
        },
        {
            id: 2,
            name: 'Unicorn fish',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%234A90E2" width="100" height="100"/><circle fill="%23fff" cx="35" cy="40" r="8"/><circle fill="%23000" cx="35" cy="40" r="4"/></svg>',
            time: '1h ago'
        },
        {
            id: 3,
            name: 'Moorish Idol',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23F5D547" width="100" height="100"/><rect fill="%23000" x="20" y="0" width="15" height="100"/><rect fill="%23000" x="50" y="0" width="15" height="100"/></svg>',
            time: '2h ago'
        }
    ],
    fishDetails: {
        1: {
            fish: {
                _id: "1",
                name: "Clownfish",
                family: "Pomacentridae",
                minSize: 8,
                maxSize: 11,
                waterType: "Saltwater",
                description: "Clownfish are small, brightly colored fish known for their symbiotic relationship with sea anemones. They have a stocky body with a rounded tail fin and are often found in shallow waters of coral reefs.",
                colorDescription: "Clownfish are easily recognizable by their vibrant orange bodies with white bands outlined in black. The patterns can vary slightly, but the striking contrast of orange, white, and black is consistent.",
                depthRangeMin: 1,
                depthRangeMax: 15,
                environment: "Coral reefs",
                region: "Indo-Pacific, including the Red Sea and Great Barrier Reef",
                conservationStatus: "Least Concern",
                consStatusDescription: "Clownfish populations are stable, but they face threats from habitat loss due to coral reef degradation and the aquarium trade.",
                aiAccuracy: 95,
                captureTimestamp: new Date().toISOString()
            },
            imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FF8C42" width="100" height="100"/><circle fill="%23fff" cx="35" cy="40" r="8"/><circle fill="%23000" cx="35" cy="40" r="4"/></svg>',
            timestamp: new Date().toISOString(),
            fishId: "1"
        },
        2: {
            fish: {
                _id: "2",
                name: "Blue Tang",
                family: "Acanthuridae",
                minSize: 12,
                maxSize: 31,
                waterType: "Saltwater",
                description: "Blue tangs are vibrant reef fish known for their electric blue coloration. They are herbivorous and play an important role in controlling algae growth on coral reefs.",
                colorDescription: "Brilliant royal blue body with a distinctive yellow tail. Black markings near the eyes create a 'palette' shape, giving them their alternative name.",
                depthRangeMin: 2,
                depthRangeMax: 40,
                environment: "Coral reefs and rocky areas",
                region: "Indo-Pacific tropical waters",
                conservationStatus: "Least Concern",
                consStatusDescription: "While populations are currently stable, blue tangs face pressure from the aquarium trade and habitat loss.",
                aiAccuracy: 92,
                captureTimestamp: new Date().toISOString()
            },
            imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%234A90E2" width="100" height="100"/><circle fill="%23fff" cx="35" cy="40" r="8"/><circle fill="%23000" cx="35" cy="40" r="4"/></svg>',
            timestamp: new Date().toISOString(),
            fishId: "2"
        },
        3: {
            fish: {
                _id: "3",
                name: "Moorish Idol",
                family: "Zanclidae",
                minSize: 15,
                maxSize: 23,
                waterType: "Saltwater",
                description: "Moorish idols are distinctive reef fish with compressed disc-like bodies. They are commonly found around coral reefs and rocky shores in tropical Indo-Pacific waters.",
                colorDescription: "White body with bold vertical black stripes and a bright yellow dorsal area. Long, flowing dorsal fin filament extends well beyond the body.",
                depthRangeMin: 3,
                depthRangeMax: 180,
                environment: "Coral reefs and rocky shores",
                region: "Indo-Pacific and Eastern Pacific",
                conservationStatus: "Least Concern",
                consStatusDescription: "Moorish idols are widespread and relatively common, though they are sensitive to aquarium conditions and rarely survive in captivity.",
                aiAccuracy: 88,
                captureTimestamp: new Date().toISOString()
            },
            imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23F5D547" width="100" height="100"/><rect fill="%23000" x="20" y="0" width="15" height="100"/><rect fill="%23000" x="50" y="0" width="15" height="100"/></svg>',
            timestamp: new Date().toISOString(),
            fishId: "3"
        }
    }
};

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`API call to ${endpoint} failed:`, error.message);
        throw error; // Throw instead of returning null
    }
}

export async function getRecentCatches() {
    try {
        const response = await fetchAPI('/catches/recent');
        
        // Handle API response structure
        if (response && response.success && response.data) {
            return response.data.map(item => ({
                id: item.fishId || item.fish._id,
                name: item.fish.name,
                image: item.imageUrl,
                time: formatTimestamp(item.timestamp)
            }));
        }
        
        return MOCK_DATA.recentCatches;
    } catch (error) {
        console.warn('Failed to fetch recent catches:', error);
        return MOCK_DATA.recentCatches;
    }
}

export async function getAllCatches() {
    try {
        const response = await fetchAPI('/catches');
        
        // Handle API response structure
        if (response && response.success && response.data) {
            return response.data.map(item => ({
                id: item.fishId || item.fish._id,
                name: item.fish.name,
                image: item.imageUrl,
                time: formatTimestamp(item.timestamp)
            }));
        }
        
        return MOCK_DATA.recentCatches;
    } catch (error) {
        console.warn('Failed to fetch all catches:', error);
        return MOCK_DATA.recentCatches;
    }
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Unknown';
    
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export async function getCatchDetails(id) {
    try {
        const response = await fetchAPI(`/catches/${id}`);
        
        // Handle API response structure
        if (response && response.success && response.data && response.data.length > 0) {
            const item = response.data[0];
            return {
                id: item.fishId || item.fish._id,
                name: item.fish.name,
                image: item.imageUrl,
                time: formatTimestamp(item.timestamp)
            };
        }
        
        return MOCK_DATA.recentCatches.find(c => c.id === id);
    } catch (error) {
        console.warn('Failed to fetch catch details:', error);
        return MOCK_DATA.recentCatches.find(c => c.id === id);
    }
}

export async function getFishDetails(id) {
    try {
        const response = await fetchAPI(`/fish/details/${id}`);
        
        // Handle API response structure
        if (response && response.success && response.data && response.data.length > 0) {
            return response.data[0]; // Returns { fish: {...}, imageUrl: "...", timestamp: "..." }
        }
        
        // Fallback to mock data
        return MOCK_DATA.fishDetails[id] || {
            fish: {
                _id: id,
                name: 'Unknown Fish',
                family: 'Unknown',
                minSize: 0,
                maxSize: 0,
                waterType: 'Unknown',
                description: 'No information available.',
                colorDescription: 'No appearance information available.',
                depthRangeMin: 0,
                depthRangeMax: 0,
                environment: 'Unknown',
                region: 'Unknown',
                conservationStatus: 'Unknown',
                aiAccuracy: 0,
                captureTimestamp: new Date().toISOString()
            },
            imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23999" width="100" height="100"/></svg>',
            timestamp: new Date().toISOString(),
            fishId: id
        };
    } catch (error) {
        console.error('Error fetching fish details:', error);
        throw error;
    }
}

export async function identifyFish(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
        const response = await fetchAPI('/fish/identify', {
            method: 'POST',
            body: formData,
            headers: {}
        });
        
        // Handle API response structure
        if (response && response.success && response.data && response.data.length > 0) {
            const fishData = response.data[0];
            return { 
                id: fishData.fishId || fishData.fish._id,
                name: fishData.fish.name,
                confidence: fishData.fish.aiAccuracy / 100
            };
        }
        
        // Fallback to placeholder with random existing fish ID
        const randomId = Math.floor(Math.random() * 3) + 1;
        return { id: randomId, name: 'Identified Fish', confidence: 0.85 };
    } catch (error) {
        console.error('Error identifying fish:', error);
        // Return placeholder on error
        const randomId = Math.floor(Math.random() * 3) + 1;
        return { id: randomId, name: 'Identified Fish', confidence: 0.85 };
    }
}

export async function sendChatMessage(message) {
    const data = await fetchAPI('/chat', {
        method: 'POST',
        body: JSON.stringify({ message })
    });
    
    return data || { 
        reply: `You asked about: "${message}". This is a placeholder response from the AI assistant.` 
    };
}

export default {
    getRecentCatches,
    getAllCatches,
    getCatchDetails,
    getFishDetails,
    identifyFish,
    sendChatMessage
};
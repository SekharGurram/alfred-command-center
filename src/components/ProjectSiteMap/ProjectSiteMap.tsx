import React, {useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SiteBriefingModal from '../SiteBriefingModal/SiteBriefingModal';

// Custom white marker icon
const whiteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-white.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Site = {
  _id: string;
  name: string;
  location: { lat: number; lng: number };
  weather: { temp: number; wind: number; condition: string };
  capacity: string;
  capacityChange: string;
  progress: number;
  spi: number;
  created_at: string;
  updated_at: string;
  __v: number;
};
interface ProjectSiteMapProps {
  sites: Site[];
  selectedSite: Site | null;
  onSiteClick: (site: Site) => void;
}

const ProjectSiteMap: React.FC<ProjectSiteMapProps> = ({ sites, selectedSite, onSiteClick }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSiteForDialog, setSelectedSiteForDialog] = useState<any>({});
  const [tasksInfo, setTasksInfo] = useState<any>({});
  const baseUrl=process.env.REACT_APP_API_BASE_URL;

  const handleOpenDialog = async (site: any) => {
    const projectTasks = await getTasksOfProject(site._id);
    setDialogOpen(true);
    setSelectedSiteForDialog(site);
  }
  const handleCloseDialog = () => setDialogOpen(false);

  const getTasksOfProject = async (projectId: String) => {
    try {
      const res= await fetch(`${baseUrl}/tasks/${projectId}`);
      const result = await res.json();
      setTasksInfo(result.data);
    } catch (err) {
      console.log("err getting in tasks:", err);
    }
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {selectedSite && dialogOpen && (
        <SiteBriefingModal
          open={dialogOpen}
          onClose={handleCloseDialog}
          site={selectedSiteForDialog}
          tasksInfo={tasksInfo}
        />
      )}
      <MapContainer center={[22.7196, 76.5]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {sites.map((site, index) => (
          <Marker
            key={index}
            position={[site.location.lat, site.location.lng]}
            icon={whiteIcon}
            eventHandlers={{
              click: () => {
                if (onSiteClick) onSiteClick(site);
              },
            }}
          >
            <Popup>
              <strong style={{ color: 'orange' }}>{site.name}</strong><br />
              {site.weather?.condition}, {site.weather?.temp}°C<br />
              Wind: {site.weather?.wind} km/h<br />
              Progress: {site.progress}%<br />
              Capacity: {site.capacity}<br />
              <button
                style={{
                  marginTop: '8px',
                  backgroundColor: '#ff8c00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  handleOpenDialog(site);
                }}
              >
                View Site Briefing
              </button>
            </Popup>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              <span style={{ color: 'orange', fontWeight: 'bold' }}>{site.name}</span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProjectSiteMap;

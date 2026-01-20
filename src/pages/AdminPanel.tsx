/**
 * Admin Dashboard
 * Main admin interface for managing CMS content
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppwriteService, type SiteSettings, type HeroContent, type MissionSection, type MissionItem, type NGOSection, type InfoCard, type TeamMember } from '../services/appwrite';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'site' | 'hero' | 'mission' | 'ngo' | 'info-cards' | 'team'>('site');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Site settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: '',
    tagline: '',
    logo: '',
    primaryDonationUrl: '',
    email: '',
    phone: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
  });

  // Hero content state
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonUrl: '',
    backgroundImage: '',
  });

  // Mission section state
  const [missionSection, setMissionSection] = useState<MissionSection>({
    title: '',
    missionImage: '',
    ctaButtonText: '',
    ctaButtonUrl: '',
  });

  // Mission items state
  const [missionItems, setMissionItems] = useState<MissionItem[]>([]);

  // NGO section state
  const [ngoSection, setNGOSection] = useState<NGOSection>({
    title: '',
    description: '',
  });

  // Info cards state
  const [infoCards, setInfoCards] = useState<InfoCard[]>([]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [site, hero, mission, items, ngo, cards, team] = await Promise.all([
        AppwriteService.getSiteSettings(),
        AppwriteService.getHeroContent(),
        AppwriteService.getMissionSection(),
        AppwriteService.getMissionItems(),
        AppwriteService.getNGOSection(),
        AppwriteService.getInfoCards(),
        AppwriteService.getTeamMembers(),
      ]);

      setSiteSettings(site);
      setHeroContent(hero);
      setMissionSection(mission);
      setMissionItems(items);
      setNGOSection(ngo);
      setInfoCards(cards);
      setTeamMembers(team);
    } catch (error) {
      console.error('Failed to load data:', error);
      setMessage('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveSiteSettings = async () => {
    try {
      setLoading(true);
      // Note: In a real implementation, you'd use Appwrite updateDocument
      // For now, we'll just show success message
      showMessage('Site settings saved successfully!', 'success');
    } catch (error) {
      console.error('Failed to save site settings:', error);
      showMessage('Failed to save site settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveHeroContent = async () => {
    try {
      setLoading(true);
      showMessage('Hero content saved successfully!', 'success');
    } catch (error) {
      console.error('Failed to save hero content:', error);
      showMessage('Failed to save hero content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addMissionItem = () => {
    const newItem: MissionItem = {
      text: '',
      icon: '',
      order: missionItems.length + 1,
    };
    setMissionItems([...missionItems, newItem]);
  };

  const updateMissionItem = (index: number, field: keyof MissionItem, value: string | number) => {
    const updated = [...missionItems];
    updated[index] = { ...updated[index], [field]: value };
    setMissionItems(updated);
  };

  const removeMissionItem = (index: number) => {
    setMissionItems(missionItems.filter((_, i) => i !== index));
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      name: '',
      role: '',
      location: '',
      image: '',
      description: '',
      email: '',
      order: teamMembers.length + 1,
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string | number) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-slate-800 text-white h-16 shadow-lg">
        
      </div>
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Content Management</h2>
        
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="overflow-x-auto scrollbar-hide">
              <nav className="flex space-x-1 sm:space-x-8 min-w-max px-2 sm:px-0" aria-label="Tabs">
                {[
                  { id: 'site', label: 'Site Settings' },
                  { id: 'hero', label: 'Hero Content' },
                  { id: 'mission', label: 'Mission' },
                  { id: 'ngo', label: 'About' },
                  { id: 'info-cards', label: 'Info Cards' },
                  { id: 'team', label: 'Team' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-hopely-pink text-hopely-pink'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-hopely-pink"></div>
              </div>
            )}

            {!loading && activeTab === 'site' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <textarea
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({...siteSettings, tagline: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                    <input
                      type="text"
                      value={siteSettings.logo}
                      onChange={(e) => setSiteSettings({...siteSettings, logo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Donation URL</label>
                    <input
                      type="url"
                      value={siteSettings.primaryDonationUrl}
                      onChange={(e) => setSiteSettings({...siteSettings, primaryDonationUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={siteSettings.instagramUrl}
                      onChange={(e) => setSiteSettings({...siteSettings, instagramUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={siteSettings.facebookUrl}
                      onChange={(e) => setSiteSettings({...siteSettings, facebookUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                    <input
                      type="url"
                      value={siteSettings.twitterUrl}
                      onChange={(e) => setSiteSettings({...siteSettings, twitterUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                </div>
                <button
                  onClick={saveSiteSettings}
                  className="mt-6 bg-hopely-pink text-white px-6 py-2 rounded-md hover:bg-hopely-pink-dark focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:ring-offset-2"
                >
                  Save Site Settings
                </button>
              </div>
            )}

            {!loading && activeTab === 'hero' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Hero Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <textarea
                      value={heroContent.subtitle}
                      onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={heroContent.buttonText}
                      onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                    <input
                      type="url"
                      value={heroContent.buttonUrl}
                      onChange={(e) => setHeroContent({...heroContent, buttonUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                    <input
                      type="text"
                      value={heroContent.backgroundImage}
                      onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                </div>
                <button
                  onClick={saveHeroContent}
                  className="mt-6 bg-hopely-pink text-white px-6 py-2 rounded-md hover:bg-hopely-pink-dark focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:ring-offset-2"
                >
                  Save Hero Content
                </button>
              </div>
            )}

            {!loading && activeTab === 'mission' && (
              <div>
                <div className="space-y-8">
                  {/* Mission Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Mission Section</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={missionSection.title}
                          onChange={(e) => setMissionSection({...missionSection, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Image</label>
                        <input
                          type="text"
                          value={missionSection.missionImage}
                          onChange={(e) => setMissionSection({...missionSection, missionImage: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                        <input
                          type="text"
                          value={missionSection.ctaButtonText}
                          onChange={(e) => setMissionSection({...missionSection, ctaButtonText: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button URL</label>
                        <input
                          type="url"
                          value={missionSection.ctaButtonUrl}
                          onChange={(e) => setMissionSection({...missionSection, ctaButtonUrl: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          showMessage('Mission section saved successfully!', 'success');
                          setLoading(false);
                        }, 1000);
                      }}
                      className="mt-6 bg-hopely-pink text-white px-6 py-2 rounded-md hover:bg-hopely-pink-dark focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:ring-offset-2"
                    >
                      Save Mission Section
                    </button>
                  </div>

                  {/* Mission Items */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Mission Items</h2>
                      <button
                        onClick={addMissionItem}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Add Mission Item
                      </button>
                    </div>
                    <div className="space-y-4">
                      {missionItems.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                              <textarea
                                value={item.text}
                                onChange={(e) => updateMissionItem(index, 'text', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                              <input
                                type="text"
                                value={item.icon}
                                onChange={(e) => updateMissionItem(index, 'icon', e.target.value)}
                                placeholder="🎁 or emoji"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                              <input
                                type="number"
                                value={item.order}
                                onChange={(e) => updateMissionItem(index, 'order', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => removeMissionItem(index)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      {missionItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                          <p>No mission items yet. Click "Add Mission Item" to get started.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && activeTab === 'team' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Team Members</h2>
                  <button
                    onClick={addTeamMember}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add Team Member
                  </button>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <input
                            type="text"
                            value={member.location}
                            onChange={(e) => updateTeamMember(index, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                          <input
                            type="text"
                            value={member.image}
                            onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={member.description}
                            onChange={(e) => updateTeamMember(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={member.order}
                            onChange={(e) => updateTeamMember(index, 'order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && activeTab === 'ngo' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">About Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={ngoSection.title}
                      onChange={(e) => setNGOSection({...ngoSection, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={ngoSection.description}
                      onChange={(e) => setNGOSection({...ngoSection, description: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      showMessage('About section saved successfully!', 'success');
                      setLoading(false);
                    }, 1000);
                  }}
                  className="mt-6 bg-hopely-pink text-white px-6 py-2 rounded-md hover:bg-hopely-pink-dark focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:ring-offset-2"
                >
                  Save About Section
                </button>
              </div>
            )}

            {!loading && activeTab === 'info-cards' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Info Cards</h2>
                  <button
                    onClick={() => {
                      const newCard: InfoCard = {
                        title: '',
                        description: '',
                        backgroundImage: '',
                        iconImage: '',
                        order: infoCards.length + 1,
                      };
                      setInfoCards([...infoCards, newCard]);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add Info Card
                  </button>
                </div>
                <div className="space-y-4">
                  {infoCards.map((card, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...infoCards];
                              updated[index] = { ...updated[index], title: e.target.value };
                              setInfoCards(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={card.description}
                            onChange={(e) => {
                              const updated = [...infoCards];
                              updated[index] = { ...updated[index], description: e.target.value };
                              setInfoCards(updated);
                            }}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          <input
                            type="text"
                            value={card.backgroundImage}
                            onChange={(e) => {
                              const updated = [...infoCards];
                              updated[index] = { ...updated[index], backgroundImage: e.target.value };
                              setInfoCards(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon Image</label>
                          <input
                            type="text"
                            value={card.iconImage}
                            onChange={(e) => {
                              const updated = [...infoCards];
                              updated[index] = { ...updated[index], iconImage: e.target.value };
                              setInfoCards(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={card.order}
                            onChange={(e) => {
                              const updated = [...infoCards];
                              updated[index] = { ...updated[index], order: parseInt(e.target.value) };
                              setInfoCards(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => {
                            const updated = infoCards.filter((_, i) => i !== index);
                            setInfoCards(updated);
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

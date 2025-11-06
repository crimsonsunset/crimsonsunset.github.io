<template>
  <div 
    class="colored-avatar"
    :class="{ 'colored-avatar--full': mode === 'full' }"
    :style="avatarStyles"
  >
    {{ displayText }}
  </div>
</template>

<script>
export default {
  name: 'ColoredAvatar',
  props: {
    text: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: 'initials',
      validator: value => ['initials', 'full'].includes(value)
    },
    size: {
      type: String,
      default: '40px'
    }
  },
  computed: {
    displayText() {
      if (this.mode === 'full') {
        return this.text;
      }
      
      // Initials mode: extract first letter of first and last name
      const parts = this.text.trim().split(' ');
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    },
    avatarColor() {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DFE6E9', '#74B9FF', '#A29BFE', '#FD79A8', '#FDCB6E',
        '#6C5CE7', '#00B894', '#00CEC9', '#0984E3', '#E17055',
        '#55EFC4', '#81ECEC', '#FAB1A0', '#FF7675', '#FD79A8'
      ];
      
      let hash = 0;
      for (let i = 0; i < this.text.length; i++) {
        hash = this.text.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      const index = Math.abs(hash) % colors.length;
      return colors[index];
    },
    textColor() {
      const color = this.avatarColor;
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? '#333' : '#FFF';
    },
    avatarStyles() {
      const baseStyles = {
        backgroundColor: this.avatarColor,
        color: this.textColor
      };
      
      if (this.mode === 'initials') {
        return {
          ...baseStyles,
          width: this.size,
          height: this.size,
          fontSize: `calc(${this.size} * 0.4)`
        };
      }
      
      return {
        ...baseStyles,
        minWidth: this.size,
        minHeight: this.size,
        fontSize: '14px'
      };
    }
  }
}
</script>

<style scoped>
.colored-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.colored-avatar--full {
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  word-wrap: break-word;
  cursor: pointer;
}

.colored-avatar--full:hover {
  transform: scale(1.05);
}
</style>








